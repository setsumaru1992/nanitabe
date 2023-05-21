module Queries::Dish
  class DishRegisteredWithMeal < ::Types::BaseObject
    implements ::Types::Output::Dish::DishFields
  end

  # ロジックが固まった後にExistingDishesForRegisteringWithMealに命名変更
  class Dishes < ::Queries::BaseQuery
    argument :search_string, String, required: false

    type [DishRegisteredWithMeal, { null: false }], null: false

    def resolve(search_string: nil)
      ::Application::Finder::DishesForRegisteringWithMeal.call(
        access_user_id: context[:current_user_id],
        search_string:,
      )
    end
  end
end
