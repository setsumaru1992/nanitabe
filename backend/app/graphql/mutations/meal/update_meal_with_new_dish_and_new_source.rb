module Mutations::Meal
  class UpdateMealWithNewDishAndNewSource < ::Mutations::BaseMutation
    argument :meal, ::Types::Input::Meal::MealForUpdate, required: true
    argument :dish, ::Types::Input::Dish::DishForCreate, required: true

    field :meal_id, Int, null: false
    field :dish_id, Int, null: false

    def resolve(meal:, dish:)
      ActiveRecord::Base.transaction do
        updated_meal = ::Business::Dish::Command::Meal::Update::UpdateMealWithNewDishCommand.call(
          user_id: context[:current_user_id],
          dish_for_create: ::Business::Dish::Dish::Command::Params::DishForCreate.new(
            name: dish.name,
            meal_position: dish.meal_position,
            comment: dish.comment,
          ),
          meal_for_update: ::Business::Dish::Meal::Command::Params::MealForUpdate.new(
            id: meal.id,
            date: meal.date,
            meal_type: meal.meal_type,
            comment: meal.comment,
          ),
        )
        {
          meal_id: meal.id,
          dish_id: updated_meal.dish_id,
        }
      end
    end
  end
end
