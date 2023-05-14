require "rails_helper"
require_relative "../../graphql_auth_helper"
require_relative "../../../domain/business/dish/dish/repository/repository_add_shared_examples"
require_relative "../../../domain/business/dish/dish/repository/repository_update_shared_examples"

module Mutations::Dish
  RSpec.describe AddDish, type: :request do
    def build_mutation
      <<~GRAPHQL
        mutation addDish(
          $dish: DishForCreate!
          $dishSource: SourceForRead
          $dishSourceRelationDetail: DishSourceRelationDetail
        ) {
          addDish(input: {
            dish: $dish
            dishSource: $dishSource
            dishSourceRelationDetail: $dishSourceRelationDetail
          }
        ) {
            dishId
          }
        }
      GRAPHQL
    end

    before do
      dish_comparer.build_records_for_test()
      dish_source_relation_comparer.build_records_for_test()
    end

    context "when add dish" do
      let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED_WITH_FULL_VALUES] }
      let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_SHOULD_BE_CREATED] }

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
        }
        response = fetch_mutation_with_auth(build_mutation, variables, dish_comparer.prepared_records[:user_record].id)
        dish_comparer.compare_to_expectation(
          self,
          dish_id: response["addDish"]["dishId"],
        )
      end
    end
  end
end
