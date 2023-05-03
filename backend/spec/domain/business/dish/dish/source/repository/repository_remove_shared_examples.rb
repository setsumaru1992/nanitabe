require_relative "../../../../../../support/factories/user_repository"
require_relative "../../../../../../support/factories/dish_sources_repository"

KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_UPDATED = "DISH_SOURCE_SHOULD_BE_UPDATED"
comparer = ExpectationComparer.new(KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_UPDATED, {
  name: "初心者を超えたい人の中華料理",
})

comparer.define_required_records_for_test do
  {
    user_record: find_or_create_user(),
    dish_source_record: find_or_create_dish_source(),
  }
end

comparer.define_expectation do |expected_values, prepared_records|
  updated_dish_source_record = ::DishSource.last
  expect(updated_dish_source_record.name).to eq expected_values[:name]
  expect(updated_dish_source_record.type).to eq expected_values[:type]
  expect(updated_dish_source_record.comment).to eq expected_values[:comment]
  expect(updated_dish_source_record.user_id).to eq prepared_records[:user_record].id
end

COMPARERS[comparer.key] = comparer

KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_UPDATED_WITH_FULL_VALUES = "DISH_SOURCE_SHOULD_BE_UPDATED_WITH_FULL_VALUES"
comparer = ExpectationComparer.new(KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_UPDATED_WITH_FULL_VALUES, {
  name: "はじめての中華料理",
  type: ::Business::Dish::Dish::Source::Type::RECIPE_BOOK,
  comment: "中級者向け",
})

comparer.define_required_records_for_test do
  {
    user_record: find_or_create_user(),
    dish_source_record: find_or_create_dish_source(),
  }
end

comparer.define_expectation do |expected_values, prepared_records|
  updated_dish_source_record = ::DishSource.last
  expect(updated_dish_source_record.name).to eq expected_values[:name]
  expect(updated_dish_source_record.type).to eq expected_values[:type]
  expect(updated_dish_source_record.comment).to eq expected_values[:comment]
  expect(updated_dish_source_record.user_id).to eq prepared_records[:user_record].id
end

COMPARERS[comparer.key] = comparer
