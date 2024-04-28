require "rails_helper"
require_relative "../../graphql_auth_helper"
require_relative "../../../domain/business/dish/meal/repository/repository_update_shared_examples"
require_relative "../../../domain/business/dish/dish/repository/repository_add_shared_examples"
require_relative "../../../domain/business/dish/dish/source/repository/repository_add_shared_examples"
require_relative "../../../domain/business/dish/dish/repository/repository_put_dish_relation_shared_examples"
require_relative "../../../domain/business/dish/dish/tag/repository/repository_add_shared_examples"

module Mutations::Meal
  RSpec.describe UpdateMealWithNewDishAndNewSource, type: :request do
    def build_mutation
      <<~GRAPHQL
        mutation updateMealWithNewDishAndNewSource(
          $dish: DishForCreate!
          $dishSource: SourceForCreate!
          $dishSourceRelationDetail: DishSourceRelationDetail
          $dishTags: [Tag!]
          $meal: MealForUpdate!
        ) {
          updateMealWithNewDishAndNewSource(input: {
            dish: $dish
            dishSource: $dishSource
            dishSourceRelationDetail: $dishSourceRelationDetail
            dishTags: $dishTags
            meal: $meal
          }
        ) {
            mealId
            dishId
            dishSourceId
          }
        }
      GRAPHQL
    end

    before do
      dish_comparer.build_records_for_test()
      dish_source_comparer.build_records_for_test()
      dish_source_relation_comparer.build_records_for_test()
      dish_tag_comparer.build_records_for_test()
      meal_comparer.build_records_for_test()
    end

    context "when add meal with new dish and new source by graphql with full params for architecture communication confirmation, " do
      let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED_WITH_FULL_VALUES] }
      let!(:dish_source_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_CREATED_WITH_FULL_VALUES] }
      let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_SHOULD_BE_CREATED] }
      let!(:dish_tag_comparer) { COMPARERS[KEY_OF_TEST_DISH_TAG_SHOULD_BE_CREATED] }
      let!(:meal_comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_UPDATED_WITH_FULL_FIELD] }

      it "updating succeeds" do
        variables = {
          dish: {
            name: dish_comparer.values[:name],
            mealPosition: dish_comparer.values[:meal_position],
            comment: dish_comparer.values[:comment],
          },
          dishSource: {
            name: dish_source_comparer.values[:name],
            type: dish_source_comparer.values[:type],
            comment: dish_source_comparer.values[:comment],
          },
          dishSourceRelationDetail: {
            recipeBookPage: dish_source_relation_comparer.values[:recipe_book_page],
          },
          dishTags: [
            {
              content: dish_tag_comparer.values[:content],
            },
          ],
          meal: {
            id: meal_comparer.prepared_records[:meal_record].id,
            date: meal_comparer.values[:date],
            mealType: meal_comparer.values[:meal_type],
            comment: meal_comparer.values[:comment],
          },
        }
        response = fetch_mutation_with_auth(build_mutation, variables, meal_comparer.prepared_records[:user_record].id)

        created_dish_id = response["updateMealWithNewDishAndNewSource"]["dishId"]
        created_dish_source_id = response["updateMealWithNewDishAndNewSource"]["dishSourceId"]
        dish_comparer.compare_to_expectation(self)
        dish_source_comparer.compare_to_expectation(self)
        dish_source_relation_comparer.compare_to_expectation(
          self,
          dish_id: created_dish_id,
          dish_source_id: created_dish_source_id,
        )
        dish_tag_comparer.compare_to_expectation(self, dish_id: created_dish_id)
        meal_comparer.compare_to_expectation(
          self,
          dish_id: created_dish_id,
        )
      end
    end
  end
end
