module Types::Input::Meal
  class MealForCreate < ::Types::Input::CommandParamConvertableInput
    CONVERT_DESTINATION_CLASS = ::Business::Dish::Meal::Command::Params::MealForCreate

    argument :date, GraphQL::Types::ISO8601Date, required: true
    argument :meal_type, Int, required: true
    argument :comment, String, required: false
  end
end
