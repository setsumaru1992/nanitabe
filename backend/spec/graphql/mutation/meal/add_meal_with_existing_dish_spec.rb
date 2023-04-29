# GraphQLのエンドポイントが発火しないのでエラーになる。コミット時は一旦コメントアウトして、成功したら解除
# なんでなんだ。仮説: キャメル・パスカルなどのケース違い、認証ヘッダがないための認証エラー

require "rails_helper"
require_relative "../graphql_helper"
require_relative "../../../domain/business/dish/meal/repository/repository_add_shared_examples"

def build_mutation
  # <<~GRAPHQL
  #   mutation addMealWithExistingDish($dishId: Int!, $meal: MealForCreate!) {
  #     addMealWithExistingDish(input: {dishId: $dishId, meal: $meal}) {
  #       mealId
  #     }
  #   }
  # GRAPHQL
  <<~GRAPHQL
    mutation add_meal_with_existing_dish($dish_id: Int!, $meal: MealForCreate!) {
      add_meal_with_existing_dish(input: {dish_id: $dish_id, meal: $meal}) {
        meal_id
      }
    }
  GRAPHQL
end

module Mutations::Meal
  RSpec.describe AddMealWithExistingDish, type: :request do
    before do
      comparer.build_records_for_test()
    end

    context "when add dish" do
      let!(:comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_CREATED] }

      it "adding succeeds" do
        variables = {
          dish_id: comparer.prepared_records[:dish_record].id,
          meal: {
            date: comparer.values[:date],
            meal_type: comparer.values[:meal_type],
            comment: comparer.values[:comment],
          },
        }
        pp variables
        fetch_mutation(build_mutation, variables, "addMealWithExistingDish")

        comparer.compare_to_expectation(self)
      end
    end
  end
end
