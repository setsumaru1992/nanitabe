module Queries::Meal
  class MealForCalender < ::Types::BaseObject
    implements ::Types::Output::Meal::Meal
  end

  class MealsOfDate < ::Types::BaseObject
    field :date, GraphQL::Types::ISO8601Date, null: false
    field :meals, [MealForCalender, { null: false }], null: false
  end

  class MealsForCalender < ::Queries::BaseQuery
    argument :start_date, GraphQL::Types::ISO8601Date, required: true

    type [MealsOfDate, { null: false }], null: false

    def resolve(start_date:)
      # last_date = start_date + 6.day
      # meals = ::Meal.where(date: start_date..last_date)
      [
        {
          date: Date.new(2023, 2, 22),
          meals: [
            id: 3,
            date: Date.new(2023, 2, 22),
            meal_type: 2,
            dish: {
              id: 6,
              name: "鯖味噌",
              meal_position: 2,
            },
          ],
        },
      ]
    end
  end
end
