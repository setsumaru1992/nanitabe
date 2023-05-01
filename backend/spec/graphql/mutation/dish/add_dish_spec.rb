require "rails_helper"
require_relative "../../graphql_auth_helper"
require_relative "../../../domain/business/dish/dish/repository/repository_add_shared_examples"

module Mutations::Dish
  RSpec.describe AddDish, type: :request do
    def build_mutation
      <<~GRAPHQL
        mutation addDish($dish: DishForCreate!) {
          addDish(input: {dish: $dish}) {
            dishId
          }
        }
      GRAPHQL
    end

    before do
      comparer.build_records_for_test()
    end

    context "when add dish" do
      let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED_WITH_FULL_VALUES] }

      it "adding succeeds" do
        variables = {
          dish: {
            name: comparer.values[:name],
            mealPosition: comparer.values[:meal_position],
            comment: comparer.values[:comment],
          },
        }
        fetch_mutation_with_auth(build_mutation, variables, comparer.prepared_records[:user_record].id)
        comparer.compare_to_expectation(self)
      end
    end
  end
end
