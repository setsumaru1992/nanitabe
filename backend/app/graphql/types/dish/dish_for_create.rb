module Types::Dish
  class DishForCreate < ::Types::BaseInputObject
    argument :name, String, required: true
    argument :meal_position, Int, required: true
    argument :comment, String, required: false
  end
end