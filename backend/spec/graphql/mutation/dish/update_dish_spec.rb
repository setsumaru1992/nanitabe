require "rails_helper"
require_relative "../../graphql_auth_helper"
require_relative "../../../domain/business/dish/dish/repository/repository_update_shared_examples"

module Mutations::Dish
  RSpec.describe UpdateDish, type: :request do
    def build_mutation
      <<~GRAPHQL
        mutation updateDish($dish: DishForUpdate!) {
          updateDish(input: { dish: $dish }) {
            dishId
          }
        }
      GRAPHQL
    end

    before do
      comparer.build_records_for_test()
    end

    context "when update dish" do
      let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_UPDATED_WITH_FULL_FIELD] }

      it "updating succeeds" do
        variables = {
          dish: {
            id: comparer.prepared_records[:dish_record].id,
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
