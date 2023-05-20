require "rails_helper"
require_relative "../../graphql_auth_helper"
require_relative "../../../domain/business/dish/meal/repository/repository_update_shared_examples"
require_relative "../../../domain/business/dish/dish/repository/repository_add_shared_examples"
require_relative "../../../domain/business/dish/dish/repository/repository_put_dish_relation_shared_examples"

module Mutations::Meal
  RSpec.describe UpdateMealWithNewDish, type: :request do
    def build_mutation
      <<~GRAPHQL
        mutation updateMealWithNewDish(
          $dish: DishForCreate!
          $dishSource: SourceForRead!
          $dishSourceRelationDetail: DishSourceRelationDetail
          $meal: MealForUpdate!
        ) {
          updateMealWithNewDish(input: {
            dish: $dish
            dishSource: $dishSource
            dishSourceRelationDetail: $dishSourceRelationDetail
            meal: $meal
          }
        ) {
            mealId
            dishId
          }
        }
      GRAPHQL
    end

    before do
      dish_comparer.build_records_for_test()
      dish_source_relation_comparer.build_records_for_test()
      meal_comparer.build_records_for_test()
    end

    context "when add meal and dish" do
      let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED_WITH_FULL_VALUES] }
      let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_SHOULD_BE_CREATED] }
      let!(:meal_comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_UPDATED_WITH_FULL_FIELD] }

      it "adding succeeds" do
        variables = {
          dish: {
            name: dish_comparer.values[:name],
            mealPosition: dish_comparer.values[:meal_position],
            comment: dish_comparer.values[:comment],
          },
          dishSource: {
            id: dish_source_relation_comparer.prepared_records[:dish_source_record].id,
            type: dish_source_relation_comparer.prepared_records[:dish_source_record].type,
          },
          dishSourceRelationDetail: {
            recipeBookPage: dish_source_relation_comparer.values[:recipe_book_page],
          },
          meal: {
            id: meal_comparer.prepared_records[:meal_record].id,
            date: meal_comparer.values[:date],
            mealType: meal_comparer.values[:meal_type],
            comment: meal_comparer.values[:comment],
          },
        }
        response = fetch_mutation_with_auth(build_mutation, variables, meal_comparer.prepared_records[:user_record].id)

        dish_comparer.compare_to_expectation(self)
        dish_source_relation_comparer.compare_to_expectation(self, dish_id: response["updateMealWithNewDish"]["dishId"])
        meal_comparer.compare_to_expectation(self, dish_id: response["updateMealWithNewDish"]["dishId"])
      end
    end
  end
end
