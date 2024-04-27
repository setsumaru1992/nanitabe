require "rails_helper"
require_relative "../../graphql_auth_helper"
require_relative "../../../domain/business/dish/meal/command/swap_meals_between_days_command_shared_examples"

module Mutations::Meal
  RSpec.describe UpdateMeal, type: :request do
    def build_mutation
      <<~GRAPHQL
        mutation swapMealsBetweenDays($date1: ISO8601Date!, $date2: ISO8601Date!) {
          swapMealsBetweenDays(input: {date1: $date1, date2: $date2}) {
            updatedMealIds
          }
        }
      GRAPHQL
    end

    before do
      comparer.build_records_for_test()
    end

    context "when swap between days by graphql with full params for architecture communication confirmation, " do
      let!(:comparer) { COMPARERS[KEY_OF_TEST_SWAP_FROM_DAY_WITHOUT_MEAL_TO_DAY_WITHOUT_MEAL] }
      # なぜかKEY_OF_TEST_SWAP_FROM_DAY_WITH_MEALS_TO_DAY_WITH_MEALSとかのdateを使うとエラーになったから、エラーにならない日付で実行
      #      Failure/Error: Date.parse(value.to_s).iso8601
      #
      #      Date::Error:
      #        invalid date

      it "swapping succeeds" do
        variables = {
          date1: comparer.values[:date1],
          date2: comparer.values[:date2],
        }
        fetch_mutation_with_auth(build_mutation, variables, comparer.prepared_records[:user_record].id)

        comparer.compare_to_expectation(self)
      end
    end
  end
end
