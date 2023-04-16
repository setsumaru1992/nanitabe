module Mutations::Meal
  class UpdateMealWithNewDishAndNewSource < ::Mutations::BaseMutation
    argument :meal, ::Types::Input::Meal::MealForUpdate, required: true
    argument :dish, ::Types::Input::Dish::DishForCreate, required: true

    field :meal_id, Int, null: false

    def resolve(meal:, dish:)
      ActiveRecord::Base.transaction do
        ::Bussiness::Dish::Command::Meal::Create::UpdateMealWithNewDishCommand.call(
          user_id: context[:current_user_id],
          dish_for_create: ::Bussiness::Dish::Dish::Command::Params::DishForCreate.new(
            name: dish.name,
            meal_position: dish.meal_position,
            comment: dish.comment,
          ),
          meal_for_update: ::Bussiness::Dish::Meal::Command::Params::MealForUpdate.new(
            id: meal.id,
            date: meal.date,
            meal_type: meal.meal_type,
            comment: meal.comment,
          ),
        )
      end
      { meal_id: meal.id }
    end
  end
end
