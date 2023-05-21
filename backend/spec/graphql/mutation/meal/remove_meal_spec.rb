require "rails_helper"
require_relative "../../graphql_auth_helper"
require_relative "../../../domain/business/dish/meal/repository/repository_remove_shared_examples"

module Mutations::Meal
  RSpec.describe RemoveMeal, type: :request do
    def build_mutation
      <<~GRAPHQL
        mutation removeMeal($mealId: Int!) {
          removeMeal(input: {mealId: $mealId}) {
            mealId
          }
        }
      GRAPHQL
    end

    before do
      comparer.build_records_for_test()
    end

    context "when remove meal by graphql with full params for architecture communication confirmation, " do
      let!(:comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_REMOVED] }

      it "removing succeeds" do
        variables = {
          mealId: comparer.prepared_records[:meal_record].id,
        }
        fetch_mutation_with_auth(build_mutation, variables, comparer.prepared_records[:user_record].id)

        comparer.compare_to_expectation(self)
      end
    end
  end
end
