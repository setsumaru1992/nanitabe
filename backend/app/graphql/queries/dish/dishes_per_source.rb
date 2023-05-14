module Queries::Dish
  class DishesPerMealPosition < ::Types::BaseObject
    field :meal_position, Int, null: true
    field :dishes, [::Types::Output::Dish::DishWithRegisteredMeals, { null: false }], null: false
  end

  class DishesForDisplayWithSource < ::Types::BaseObject
    field :dish_source, ::Types::Output::Dish::Source::DishSource, null: true
    field :dishes_per_meal_position, [DishesPerMealPosition, { null: false }], null: false
  end

  class DishesPerSource < ::Queries::BaseQuery
    type [DishesForDisplayWithSource, { null: false }], null: false

    def resolve
      # sourceの件数が多くなったらページングするようにし、source内のdishの件数が多くなったらsource内のdishを表示するページ作る
      ::Application::Finder::DishesPerSourceFinder.call(
        access_user_id: context[:current_user_id],
      )
    end
  end
end
