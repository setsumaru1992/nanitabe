module Queries::Dish
  class DishesOfMealPosition < ::Types::BaseObject
    field :meal_position, Int, null: true
    field :dishes, [::Types::Output::Dish::Dish, { null: false }], null: false
  end

  class DishesForDisplayWithSource < ::Types::BaseObject
    field :source_id, Int, null: true
    field :positions, [DishesOfMealPosition, { null: false }], null: false
  end

  class DishesPerSource < ::Queries::BaseQuery
    type [DishesForDisplayWithSource, { null: false }], null: false

    def resolve
      ::Application::Finder::DishesPerSourceFinder.call(
        access_user_id: context[:current_user_id],
      )
    end
  end
end
