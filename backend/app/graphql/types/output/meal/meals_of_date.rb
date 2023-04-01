module Types::Output::Meal
  class MealsOfDate < ::Types::BaseObject
    field :date, GraphQL::Types::ISO8601Date, null: false
    field :meals, [MealForCalender], null: false
  end
end
