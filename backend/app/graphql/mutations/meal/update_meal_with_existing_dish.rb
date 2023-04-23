module Mutations::Meal
  class UpdateMealWithExistingDish < ::Mutations::BaseMutation
    argument :meal, ::Types::Input::Meal::MealForUpdate, required: true
    argument :dish_id, Int, required: false

    field :meal_id, Int, null: false

    def resolve(meal:, dish_id:)
      ActiveRecord::Base.transaction do
        ::Business::Dish::Meal::Command::UpdateMealCommand.call(
          user_id: context[:current_user_id],
          meal_for_update: ::Business::Dish::Meal::Command::Params::MealForUpdate.new(
            id: meal.id,
            date: meal.date,
            meal_type: meal.meal_type,
            comment: meal.comment,
            dish_id:,
          ),
        )
      end
      { meal_id: meal.id }
    end
  end
end
