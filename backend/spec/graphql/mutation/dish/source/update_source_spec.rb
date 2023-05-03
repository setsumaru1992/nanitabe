require "rails_helper"
require_relative "../../../graphql_auth_helper"
require_relative "../../../../domain/business/dish/dish/source/repository/repository_update_shared_examples"

module Mutations::Dish
  RSpec.describe UpdateDish, type: :request do
    def build_mutation
      <<~GRAPHQL
        mutation updateDishSource($dishSource: SourceForUpdate!) {
          updateDishSource(input: { dishSource: $dishSource }) {
            dishSourceId
          }
        }
      GRAPHQL
    end

    before do
      comparer.build_records_for_test()
    end

    context "when update dish" do
      let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_UPDATED_WITH_FULL_VALUES] }

      it "updating succeeds" do
        variables = {
          dishSource: {
            id: comparer.prepared_records[:dish_source_record].id,
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
