require_relative "../../../../../support/factories/user_repository"
require_relative "../../../../../support/factories/meal_repository"
require_relative "../../../../../support/factories/dish_repository"

KEY_OF_TEST_MEAL_SHOULD_BE_REMOVED = "MEAL_SHOULD_BE_REMOVED"
comparer = ExpectationComparer.new(KEY_OF_TEST_MEAL_SHOULD_BE_REMOVED, {})

comparer.define_required_records_for_test do
  {
    user_record: find_or_create_user(),
    dish_record: find_or_create_dish(),
    meal_record: find_or_create_meal(),
  }
end

comparer.define_expectation do |_expected_values, prepared_records|
  expect(::Meal.where(id: prepared_records[:meal_record].id).present?).to eq false
  expect(::Dish.where(id: prepared_records[:dish_record].id).present?).to eq true
  expect(::User.where(id: prepared_records[:dish_record].user_id).present?).to eq true
end

COMPARERS[comparer.key] = comparer
