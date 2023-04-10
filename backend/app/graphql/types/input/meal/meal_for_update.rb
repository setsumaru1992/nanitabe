module Types::Input::Meal
  class MealForUpdate < ::Types::BaseInputObject
    argument :id, Int, required: true
    argument :date, GraphQL::Types::ISO8601Date, required: false
    argument :meal_type, Int, required: false
    argument :comment, String, required: false
  end
end
