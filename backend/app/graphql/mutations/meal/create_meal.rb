module Mutations::Meal
  class CreateMeal < ::Mutations::BaseMutation # TODO: 本当はmealだけを作るものではないので命名変更
    argument :dish, ::Types::Dish::DishForCreate, required: true
    argument :meal, ::Types::Meal::MealForCreate, required: true

    field :meal_id, Int, null: false

    def resolve(dish:, meal:nil)
      # created_meal = ::Bussiness::Meal::Command::CreateMealWithNewDishCommand.call(
      #   user_id: context[:current_user_id],
      #   dish_name: dish_name,
      #   dish_meal_position: dish_meal_position,
      #   dish_comment: dish_comment,
      #   meal_date: meal_date,
      #   meal_type: meal_type,
      #   meal_comment: meal_comment,
      # )
      # {
      #   meal_id: created_meal.id
      # }
      { meal_id: dish.meal_position }
    end

  end
end