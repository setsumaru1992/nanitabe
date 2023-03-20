module Mutations::Meal
  class CreateMeal < ::Mutations::BaseMutation
    argument :dish_name, String, required: true
    argument :dish_meal_position, Int, required: true
    argument :dish_comment, String, required: false
    argument :meal_date, GraphQL::Types::ISO8601Date, required: true
    argument :meal_type, Int, required: true
    argument :meal_comment, String, required: false

    field :meal_id, Int, null: false

    def resolve(
      dish_name: ,
      dish_meal_position: ,
      dish_comment: nil,
      meal_date: ,
      meal_type: ,
      meal_comment: nil
    )
      created_meal = ::Bussiness::Meal::Command::CreateMealWithNewDishCommand.call(
        user_id: context[:current_user_id],
        dish_name: dish_name,
        dish_meal_position: dish_meal_position,
        dish_comment: dish_comment,
        meal_date: meal_date,
        meal_type: meal_type,
        meal_comment: meal_comment,
      )
      {
        meal_id: created_meal.id
      }
    end

  end
end