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
      meals.group_by { |meal| meal.date }
           .map do |(date, meals)|
        {
          date:,
          meals:,
        }
      end
    end
  end
end
