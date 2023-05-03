require "rails_helper"
require_relative "../../../graphql_auth_helper"
require_relative "../../../../domain/business/dish/dish/source/repository/repository_add_shared_examples"

module Mutations::Dish::Source
  RSpec.describe AddSource, type: :request do
    def build_mutation
      <<~GRAPHQL
        mutation addDishSource($dishSource: SourceForCreate!) {
          addDishSource(input: {dishSource: $dishSource}) {
            dishSourceId
          }
        }
      GRAPHQL
    end

    before do
      comparer.build_records_for_test()
    end

    context "when add source" do
      let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_CREATED_WITH_FULL_VALUES] }

      it "adding succeeds" do
        variables = {
          dishSource: {
            name: comparer.values[:name],
            type: comparer.values[:type],
            comment: comparer.values[:comment],
          },
        }
        fetch_mutation_with_auth(build_mutation, variables, comparer.prepared_records[:user_record].id)
        comparer.compare_to_expectation(self)
      end
    end
  end
end
