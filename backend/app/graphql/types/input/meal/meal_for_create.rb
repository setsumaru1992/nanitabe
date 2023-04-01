module Types::Input::Meal
  class MealForCreate < ::Types::BaseInputObject
    argument :date, GraphQL::Types::ISO8601Date, required: true
    argument :meal_type, Int, required: true
    argument :comment, String, required: false
  end
end
