module Types::Input::Dish
  class DishForCreate < ::Types::Input::CommandParamConvertableInput
    CONVERT_DESTINATION_CLASS = ::Business::Dish::Dish::Command::Params::DishForCreate

    argument :name, String, required: true
    argument :meal_position, Int, required: true
    argument :comment, String, required: false
  end
end
