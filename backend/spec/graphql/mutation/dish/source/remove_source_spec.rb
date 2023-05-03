require "rails_helper"
require_relative "../../../graphql_auth_helper"
require_relative "../../../../domain/business/dish/dish/source/repository/repository_remove_shared_examples"

module Mutations::Dish::Source
  RSpec.describe RemoveSource, type: :request do
    def build_mutation
      <<~GRAPHQL
        mutation removeDishSource($dishSourceId: Int!) {
          removeDishSource(input: {dishSourceId: $dishSourceId}) {
            dishSourceId
          }
        }
      GRAPHQL
    end

    before do
      comparer.build_records_for_test()
    end

    context "when remove dish" do
      let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_REMOVED] }

      it "removing succeeds" do
        variables = {
          dishSourceId: comparer.prepared_records[:dish_source_record].id,
        }
        fetch_mutation_with_auth(build_mutation, variables, comparer.prepared_records[:user_record].id)
        comparer.compare_to_expectation(self)
      end
    end
  end
end
