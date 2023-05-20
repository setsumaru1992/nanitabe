require "rails_helper"
require_relative "../../graphql_auth_helper"
require_relative "../../../domain/business/dish/meal/repository/repository_add_shared_examples"

module Mutations::Meal
  RSpec.describe AddMeal, type: :request do
    def build_mutation
      <<~GRAPHQL
        mutation addMeal($dishId: Int!, $meal: MealForCreate!) {
          addMeal(input: {dishId: $dishId, meal: $meal}) {
            mealId
          }
        }
      GRAPHQL
    end

    before do
      comparer.build_records_for_test()
    end

    context "when add meal" do
      let!(:comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_CREATED_WITH_FULL_FIELD] }

      it "adding succeeds" do
        variables = {
          dishId: comparer.prepared_records[:dish_record].id,
          meal: {
            date: comparer.values[:date],
            mealType: comparer.values[:meal_type],
            comment: comparer.values[:comment],
          },
        }
        fetch_mutation_with_auth(build_mutation, variables, comparer.prepared_records[:user_record].id)

        comparer.compare_to_expectation(self)
      end
    end
  end
end
