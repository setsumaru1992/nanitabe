require_relative "../../../../../../support/factories/user_repository"

KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_CREATED = "DISH_SOURCE_SHOULD_BE_CREATED"
comparer = ExpectationComparer.new(KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_CREATED, {
  name: "はじめての中華料理",
  type: ::Business::Dish::Dish::Source::Type::RECIPE_BOOK,
})

comparer.define_required_records_for_test do
  {
    user_record: find_or_create_user(),
  }
end

comparer.define_expectation do |expected_values, prepared_records|
  added_dish_source_record = ::DishSource.last
  expect(added_dish_source_record.name).to eq expected_values[:name]
  expect(added_dish_source_record.type).to eq expected_values[:type]
  expect(added_dish_source_record.comment).to eq nil
  expect(added_dish_source_record.user_id).to eq prepared_records[:user_record].id
end

COMPARERS[comparer.key] = comparer

KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_CREATED_WITH_FULL_VALUES = "DISH_SOURCE_SHOULD_BE_CREATED_WITH_FULL_VALUES"
comparer = ExpectationComparer.new(KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_CREATED_WITH_FULL_VALUES, {
  name: "はじめての中華料理",
  type: ::Business::Dish::Dish::Source::Type::RECIPE_BOOK,
  comment: "初心者向け",
})

comparer.define_required_records_for_test do
  {
    user_record: find_or_create_user(),
  }
end

comparer.define_expectation do |expected_values, prepared_records|
  added_dish_source_record = ::DishSource.last
  expect(added_dish_source_record.name).to eq expected_values[:name]
  expect(added_dish_source_record.type).to eq expected_values[:type]
  expect(added_dish_source_record.comment).to eq expected_values[:comment]
  expect(added_dish_source_record.user_id).to eq prepared_records[:user_record].id
end

COMPARERS[comparer.key] = comparer
