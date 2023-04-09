module Mutations::Meal
  class AddMealWithNewDishAndNewSource < ::Mutations::BaseMutation
    argument :dish, ::Types::Input::Dish::DishForCreate, required: true
    argument :meal, ::Types::Input::Meal::MealForCreate, required: true

    field :meal_id, Int, null: false

    def resolve(dish:, meal:)
      ActiveRecord::Base.transaction do
        created_meal = ::Bussiness::Dish::Command::Meal::Create::CreateMealWithNewDishCommand.call(
          user_id: context[:current_user_id],
          dish_for_create: ::Bussiness::Dish::Dish::Command::Params::DishForCreate.new(
            name: dish.name,
            meal_position: dish.meal_position,
            comment: dish.comment,
          ),
          meal_for_create: ::Bussiness::Dish::Meal::Command::Params::MealForCreate.new(
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
