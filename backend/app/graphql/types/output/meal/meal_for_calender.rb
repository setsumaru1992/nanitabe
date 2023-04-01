module Types::Output::Meal
  class MealForCalender < ::Types::BaseObject
    field :id, Int, null: false
    field :date, GraphQL::Types::ISO8601Date, null: false
    field :meal_type, Int, null: false
    field :comment, String, null: true
    field :dish, ::Types::Output::Dish::Dish, null: false
  end
end
