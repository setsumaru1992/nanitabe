module Types::Input::Dish
  class DishForUpdate < ::Types::Input::CommandParamConvertableInput
    CONVERT_DESTINATION_CLASS = ::Business::Dish::Dish::Command::Params::DishForUpdate

    argument :id, Int, required: true
    argument :name, String, required: false
    argument :meal_position, Int, required: false
    argument :comment, String, required: false
  end
end
