module Types::Output::Dish
  class DishWithRegisteredMeals < ::Types::BaseObject
    implements DishFields

    field :meals, [Types::Output::Meal::Meal], null: false
  end
end
