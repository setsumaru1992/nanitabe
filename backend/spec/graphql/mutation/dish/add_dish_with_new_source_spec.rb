require "rails_helper"
require_relative "../../graphql_auth_helper"
require_relative "../../../domain/business/dish/dish/repository/repository_add_shared_examples"
require_relative "../../../domain/business/dish/dish/source/repository/repository_add_shared_examples"
require_relative "../../../domain/business/dish/dish/repository/repository_put_dish_relation_shared_examples"

module Mutations::Dish
  RSpec.describe AddDishWithNewSource, type: :request do
    def build_mutation
      <<~GRAPHQL
        mutation addDishWithNewSource(
          $dish: DishForCreate!
          $dishSource: SourceForCreate!
          $dishSourceRelationDetail: DishSourceRelationDetail
        ) {
          addDishWithNewSource(input: {
            dish: $dish
            dishSource: $dishSource
            dishSourceRelationDetail: $dishSourceRelationDetail
          }
        ) {
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
    end

    context "when add dish by graphql with full params for architecture communication confirmation, " do
      let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED_WITH_FULL_VALUES] }
      let!(:dish_source_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_CREATED_WITH_FULL_VALUES] }
      let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_SHOULD_BE_CREATED] }

      it "adding succeeds" do
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
        }

        response = fetch_mutation_with_auth(build_mutation, variables, dish_comparer.prepared_records[:user_record].id)

        dish_comparer.compare_to_expectation(self)
        dish_source_comparer.compare_to_expectation(self)
        dish_source_relation_comparer.compare_to_expectation(
          self,
          dish_id: response["addDishWithNewSource"]["dishId"],
          dish_source_id: response["addDishWithNewSource"]["dishSourceId"],
        )
      end
    end
  end
end
