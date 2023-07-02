module Queries::Meal
  class MealForCalender < ::Types::BaseObject
    implements ::Types::Output::Meal::MealFields
  end

  class MealsOfDate < ::Types::BaseObject
    field :date, GraphQL::Types::ISO8601Date, null: false
    field :meals, [MealForCalender, { null: false }], null: false
  end

  class MealsForCalender < ::Queries::BaseQuery
    argument :start_date, GraphQL::Types::ISO8601Date, required: true

    type [MealsOfDate, { null: false }], null: false

    def resolve(start_date:)
      last_date = start_date + 6.day
      meals = ::Meal.where(user_id: context[:current_user_id])
                    .where(date: start_date..last_date)
                    .eager_load(:dish)
                    .eager_load(dish: :dish_source)
                    .eager_load(dish: :dish_source_relation)
                    .order("meals.meal_type, dishes.meal_position")
      meals.map do |meal|
        result_meal = meal.attributes
        result_meal[:dish] = meal.dish.attributes

        dish_relation = if meal.dish&.dish_source_relation.present? && meal.dish&.dish_source.present?
                          {
                            dish_id: meal.dish.dish_source_relation.dish_id,
                            dish_source_id: meal.dish.dish_source_relation.dish_source_id,
                            type: meal.dish.dish_source.type,
                          }
                        end
        result_meal[:dish][:dish_source_relation] = dish_relation

        result_meal.with_indifferent_access
      end.group_by { |meal| meal[:date] }
           .map do |(date, meals)|
        {
          date:,
          meals:,
        }
      end || []
    end
  end
end
