module Mutations::Meal
  class AddMealWithExistingDish < ::Mutations::BaseMutation
    argument :dish_id, Int, required: true
    argument :meal, ::Types::Input::Meal::MealForCreate, required: true

    field :meal_id, Int, null: false

    def resolve(dish_id:, meal:)
      ActiveRecord::Base.transaction do
        created_meal = ::Business::Dish::Meal::Command::CreateMealCommand.call(
          user_id: context[:current_user_id],
          dish_id:,
          meal_for_create: ::Business::Dish::Meal::Command::Params::MealForCreate.new(
            date: meal.date,
            meal_type: meal.meal_type,
            comment: meal.comment,
          ),
        )
        { meal_id: created_meal.id }
      end
    end
  end
end
