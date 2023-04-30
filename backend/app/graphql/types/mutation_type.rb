module Types
  class MutationType < Types::BaseObject
    field :add_meal_with_new_dish_and_new_source, mutation: ::Mutations::Meal::AddMealWithNewDishAndNewSource
    field :add_meal_with_existing_dish, mutation: ::Mutations::Meal::AddMealWithExistingDish
    field :update_meal_with_new_dish_and_new_source, mutation: ::Mutations::Meal::UpdateMealWithNewDishAndNewSource
    field :update_meal_with_existing_dish, mutation: ::Mutations::Meal::UpdateMealWithExistingDish
    field :remove_meal, mutation: ::Mutations::Meal::RemoveMeal
  end
end
