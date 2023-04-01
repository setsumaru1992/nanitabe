module Types::Output::Dish
  class Dish < Types::BaseObject
    field :id, Int, null: false
    field :name, String, null: false
    field :meal_position, Int, null: false
    field :comment, String, null: true
  end
end
