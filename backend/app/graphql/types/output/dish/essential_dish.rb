module Types::Output::Dish
  module EssentialDish
    include Types::BaseInterface

    field :id, Int, null: false
    field :name, String, null: false
    field :meal_position, Int, null: false
    field :comment, String, null: true
  end
end
