module Queries::Dish
  class ExistingDishForRegisteringWithMeal < ::Types::BaseObject
    implements ::Types::Output::Dish::DishFields

    field :dish_source_name, String, null: true
  end

  class ExistingDishesForRegisteringWithMeal < ::Queries::BaseQuery
    argument :search_string, String, required: false
    argument :dish_id_registered_with_meal, Int, required: false

    type [ExistingDishForRegisteringWithMeal, { null: false }], null: false

    def resolve(search_string: nil, dish_id_registered_with_meal: nil)
      ::Application::Finder::DishesForRegisteringWithMeal.call(
        access_user_id: context[:current_user_id],
        search_string:,
        dish_id_registered_with_meal:,
      )
    end
  end
end
