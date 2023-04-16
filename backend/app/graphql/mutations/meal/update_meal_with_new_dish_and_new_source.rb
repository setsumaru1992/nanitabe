module Mutations::Meal
  class UpdateMealWithNewDishAndNewSource < ::Mutations::BaseMutation
    argument :meal, ::Types::Input::Meal::MealForUpdate, required: true
    argument :dish, ::Types::Input::Dish::DishForCreate, required: true

    field :meal_id, Int, null: false

    def resolve(meal:, dish:)
      ActiveRecord::Base.transaction do
        ::Bussiness::Dish::Meal::Command::UpdateMealCommand.call(
          user_id: context[:current_user_id],
          meal_for_update: ::Bussiness::Dish::Meal::Command::Params::MealForUpdate.new(
            id: meal.id,
            date: meal.date,
            meal_type: meal.meal_type,
            comment: meal.comment,
            dish_id: meal.dish_id,
          ),
        )
      end
      { meal_id: meal.id }
    end
  end
end
