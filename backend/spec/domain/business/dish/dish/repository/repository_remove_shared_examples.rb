require_relative "../../../../../support/factories/user_repository"
require_relative "../../../../../support/factories/meal_repository"
require_relative "../../../../../support/factories/dish_repository"

KEY_OF_TEST_DISH_SHOULD_BE_REMOVED = "DISH_SHOULD_BE_REMOVED"
comparer = ExpectationComparer.new(KEY_OF_TEST_DISH_SHOULD_BE_REMOVED, {})

comparer.define_required_records_for_test do
  {
    user_record: find_or_create_user(),
    dish_record: find_or_create_dish(),
  }
end

comparer.define_expectation do |_expected_values, prepared_records|
  expect(::Dish.where(id: prepared_records[:dish_record].id).present?).to eq false
  expect(::User.where(id: prepared_records[:dish_record].user_id).present?).to eq true
end

COMPARERS[comparer.key] = comparer

KEY_OF_TEST_DISH_HAVING_MEAL_SHOULD_NOT_BE_REMOVED = "DISH_HAVING_MEAL_SHOULD_NOT_BE_REMOVED"
comparer = ExpectationComparer.new(KEY_OF_TEST_DISH_HAVING_MEAL_SHOULD_NOT_BE_REMOVED, {})

comparer.define_required_records_for_test do
  {
    user_record: find_or_create_user(),
    dish_record: find_or_create_dish(),
    meal_record: find_or_create_meal(),
  }
end

comparer.define_expectation do |_expected_values, prepared_records|
  expect(::Meal.where(id: prepared_records[:meal_record].id).present?).to eq true
  expect(::Dish.where(id: prepared_records[:dish_record].id).present?).to eq true
  expect(::User.where(id: prepared_records[:dish_record].user_id).present?).to eq true
end

COMPARERS[comparer.key] = comparer
