module Types
  class MutationType < Types::BaseObject
    field :add_meal_with_new_dish_and_new_source, mutation: ::Mutations::Meal::AddMealWithNewDishAndNewSource
    field :add_meal_with_existing_dish_and_existing_source, mutation: ::Mutations::Meal::AddMealWithExistingDishAndExistingSource
    field :update_meal_with_existing_dish_and_existing_source, mutation: ::Mutations::Meal::UpdateMealWithExistingDishAndExistingSource
  end
end
