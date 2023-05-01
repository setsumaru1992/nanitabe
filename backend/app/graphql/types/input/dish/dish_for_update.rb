module Types::Input::Dish
  class DishForUpdate < ::Types::BaseInputObject
    argument :id, Int, required: true
    argument :name, String, required: false
    argument :meal_position, Int, required: false
    argument :comment, String, required: false
  end
end
