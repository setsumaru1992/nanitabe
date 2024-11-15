module Queries::Meal
  class MealsForCalender < ::Queries::BaseQuery
    argument :start_date, GraphQL::Types::ISO8601Date, required: true

    type [Types::Output::Meal::CalenderMeal::MealsOfDate, { null: false }], null: false

    def resolve(start_date:)
      last_date = start_date + 6.day

      ::Application::Finder::CalenderMeal::DateMealsFinder.call(
        access_user_id: context[:current_user_id],
        start_date:,
        last_date:,
      )
    end
  end
end
