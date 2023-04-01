module Types::Meal
  class MealForCalender < ::Types::BaseObject
    field :id, Int, null: false
    field :date, GraphQL::Types::ISO8601Date, null: false
    field :meal_type, Int, null: false
    field :comment, String, null: false
    field :dish, ::Types::Dish::Dish, null: false
  end
end
