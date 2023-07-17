require_relative "../../../../../../support/factories/user_repository"
require_relative "../../../../../../support/factories/dish_repository"

KEY_OF_TEST_DISH_EVALUATION_SHOULD_BE_UPDATED = "DISH_EVALUATION_SHOULD_BE_UPDATED"
comparer = ExpectationComparer.new(KEY_OF_TEST_DISH_EVALUATION_SHOULD_BE_UPDATED, {
  score: 4.0,
})

comparer.define_required_records_for_test do
  {
    user_record: find_or_create_user(),
    dish_record: find_or_create_dish(),
    dish_evaluation_record: find_or_create_dish_evaluation(),
  }
end

comparer.define_expectation do |expected_values, prepared_records|
  updated_dish_evaluation_record = ::DishEvaluation.find(prepared_records[:dish_evaluation_record].id)
  expect(updated_dish_evaluation_record.user_id).to eq prepared_records[:user_record].id
  expect(updated_dish_evaluation_record.dish_id).to eq prepared_records[:dish_record].id
  expect(updated_dish_evaluation_record.score).to eq expected_values[:score]
end

COMPARERS[comparer.key] = comparer
