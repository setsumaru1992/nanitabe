module Queries::Dish
  class ExistingDishForRegisteringWithMeal < ::Types::BaseObject
    implements ::Types::Output::Dish::DishFields

    field :dish_source_name, String, null: true
  end

  class ExistingDishesForRegisteringWithMeal < ::Queries::BaseQuery
    argument :search_string, String, required: false

    type [ExistingDishForRegisteringWithMeal, { null: false }], null: false

    def resolve(search_string: nil)
      ::Application::Finder::DishesForRegisteringWithMeal.call(
        access_user_id: context[:current_user_id],
        search_string:,
      )
    end
  end
end
