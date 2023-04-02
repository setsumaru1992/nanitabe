module Types::Output::Meal
  module EssentialMeal
    include Types::BaseInterface

    field :id, Int, null: false
    field :date, GraphQL::Types::ISO8601Date, null: false
    field :meal_type, Int, null: false
    field :comment, String, null: true
    field :dish, ::Types::Output::Dish::Dish, null: false
  end
end
