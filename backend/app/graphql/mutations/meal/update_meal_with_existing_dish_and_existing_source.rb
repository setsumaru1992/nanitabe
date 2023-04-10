module Mutations::Meal
  class UpdateMealWithExistingDishAndExistingSource < ::Mutations::BaseMutation
    argument :meal, ::Types::Input::Meal::MealForUpdate, required: true
    argument :dish_id, Int, required: false

    field :meal_id, Int, null: false

    def resolve(meal:)
      ActiveRecord::Base.transaction do
        :Bussiness::Dish::Meal::Command::UpdateMealCommand.call(
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
