module Types
  class MutationType < Types::BaseObject
    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end

    field :add_meal_with_new_dish_and_new_source, mutation: ::Mutations::Meal::AddMealWithNewDishAndNewSource
  end
end
