module Mutations::Meal
  class AddMealWithExistingDishAndExistingSource < ::Mutations::BaseMutation
    argument :dish_id, Int, required: true
    argument :meal, ::Types::Meal::MealForCreate, required: true

    field :meal_id, Int, null: false

    def resolve(dish_id:, meal:)
      ActiveRecord::Base.transaction do
        created_meal = ::Bussiness::Dish::Meal::Command::CreateMealCommand.call(
          user_id: context[:current_user_id],
          dish_id: dish_id,
          meal_for_create: ::Bussiness::Dish::Meal::Command::Params::MealForCreate.new(
            date: meal.date,
            meal_type: meal.meal_type,
            comment: meal.comment,
          )
        )
        { meal_id: created_meal.id }
      end
    end
  end
end
