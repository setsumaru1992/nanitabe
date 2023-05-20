module Types::Input::Meal
  class MealForUpdate < ::Types::Input::CommandParamConvertableInput
    CONVERT_DESTINATION_CLASS = ::Business::Dish::Meal::Command::Params::MealForUpdate

    argument :id, Int, required: true
    argument :date, GraphQL::Types::ISO8601Date, required: false
    argument :meal_type, Int, required: false
    argument :comment, String, required: false
  end
end
