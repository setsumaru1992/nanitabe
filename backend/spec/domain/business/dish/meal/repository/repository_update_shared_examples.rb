require_relative "../../../../../support/factories/user_repository"
require_relative "../../../../../support/factories/dish_repository"

KEY_OF_TEST_MEAL_SHOULD_BE_UPDATED = "MEAL_SHOULD_BE_UPDATED"
comparer = ExpectationComparer.new(KEY_OF_TEST_MEAL_SHOULD_BE_UPDATED, {
  meal_type: 2,
})

comparer.define_required_records_for_test do
  {
    user_record: find_or_create_user(),
    dish_record: find_or_create_dish(),
    meal_record: find_or_create_meal(),
  }
end

comparer.define_expectation do |expected_values, prepared_records|
  updated_meal_record = ::Meal.find(prepared_records[:meal_record].id)
  expect(updated_meal_record.date).to eq expected_values[:date]
  expect(updated_meal_record.meal_type).to eq expected_values[:meal_type]
  expect(updated_meal_record.comment).to eq expected_values[:comment]
  expect(updated_meal_record.user_id).to eq prepared_records[:user_record].id
  if expected_values.key? :dish_id
    expect(updated_meal_record.dish_id).to eq expected_values[:dish_id]
  else
    expect(updated_meal_record.dish_id).to eq prepared_records[:dish_record].id
  end
end

COMPARERS[comparer.key] = comparer
