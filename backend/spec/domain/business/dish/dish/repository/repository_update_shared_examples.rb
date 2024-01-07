require_relative "../../../../../support/factories/user_repository"
require_relative "../../../../../support/factories/dish_repository"

KEY_OF_TEST_DISH_SHOULD_BE_UPDATED = "DISH_SHOULD_BE_UPDATED"
comparer = ExpectationComparer.new(KEY_OF_TEST_DISH_SHOULD_BE_UPDATED, {
  name: "親子丼",
})

comparer.define_required_records_for_test do
  {
    user_record: find_or_create_user(),
    dish_record: find_or_create_dish(),
  }
end

comparer.define_expectation do |expected_values, prepared_records|
  updated_dish_record = ::Dish.find(prepared_records[:dish_record].id)
  expect(updated_dish_record.name).to eq expected_values[:name]
  expect(updated_dish_record.meal_position).to eq expected_values[:meal_position]
  expect(updated_dish_record.comment).to eq expected_values[:comment]
  expect(updated_dish_record.user_id).to eq prepared_records[:user_record].id
end

COMPARERS[comparer.key] = comparer

KEY_OF_TEST_DISH_SHOULD_BE_UPDATED_WITH_FULL_FIELD = "DISH_SHOULD_BE_UPDATED_WITH_FULL_FIELD"
comparer = ExpectationComparer.new(KEY_OF_TEST_DISH_SHOULD_BE_UPDATED_WITH_FULL_FIELD, {
  name: "親子丼",
  meal_position: 3,
  comment: "親子丼丼丼丼",
})

comparer.define_required_records_for_test do
  {
    user_record: find_or_create_user(),
    dish_record: find_or_create_dish(),
  }
end

comparer.define_expectation do |expected_values, prepared_records|
  updated_dish_record = ::Dish.find(prepared_records[:dish_record].id)
  expect(updated_dish_record.name).to eq expected_values[:name]
  expect(updated_dish_record.meal_position).to eq expected_values[:meal_position]
  expect(updated_dish_record.comment).to eq expected_values[:comment]
  expect(updated_dish_record.user_id).to eq prepared_records[:user_record].id
end

COMPARERS[comparer.key] = comparer

KEY_OF_TEST_DISH_HAVE_NO_UPDATED = "DISH_HAVE_NO_UPDATED"
comparer = ExpectationComparer.new(KEY_OF_TEST_DISH_HAVE_NO_UPDATED, {
  name: "かつ丼",
  meal_position: 1,
})

comparer.define_required_records_for_test do
  {
    user_record: find_or_create_user(),
    dish_record: find_or_create_dish(),
  }
end

comparer.define_expectation do |expected_values, prepared_records|
  updated_dish_record = ::Dish.find(prepared_records[:dish_record].id)
  expect(updated_dish_record.name).to eq expected_values[:name]
  expect(updated_dish_record.meal_position).to eq expected_values[:meal_position]
  expect(updated_dish_record.comment).to eq expected_values[:comment]
  expect(updated_dish_record.user_id).to eq prepared_records[:user_record].id
end

COMPARERS[comparer.key] = comparer
