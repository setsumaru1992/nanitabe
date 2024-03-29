require "rails_helper"
require_relative "../../graphql_auth_helper"
require_relative "../../../domain/business/dish/dish/repository/repository_remove_shared_examples"

module Mutations::Dish
  RSpec.describe RemoveDish, type: :request do
    def build_mutation
      <<~GRAPHQL
        mutation removeDish($dishId: Int!) {
          removeDish(input: {dishId: $dishId}) {
            dishId
          }
        }
      GRAPHQL
    end

    before do
      comparer.build_records_for_test()
    end

    context "when remove dish by graphql with full params for architecture communication confirmation, " do
      let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_REMOVED] }

      it "removing succeeds" do
        variables = {
          dishId: comparer.prepared_records[:dish_record].id,
        }
        fetch_mutation_with_auth(build_mutation, variables, comparer.prepared_records[:user_record].id)

        comparer.compare_to_expectation(self)
      end
    end
  end
end
