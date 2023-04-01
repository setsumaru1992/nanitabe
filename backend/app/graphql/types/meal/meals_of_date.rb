module Types::Meal
  class MealsOfDate < ::Types::BaseObject
    field :date, GraphQL::Types::ISO8601Date, null: false
    field :meals, [::Types::Meal::MealForCalender], null: false
  end
end
