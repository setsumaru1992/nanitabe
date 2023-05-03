require_relative "../../../../../../support/factories/user_repository"
require_relative "../../../../../../support/factories/dish_sources_repository"

KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_REMOVED = "DISH_SOURCE_SHOULD_BE_REMOVED"
comparer = ExpectationComparer.new(KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_REMOVED, {})

comparer.define_required_records_for_test do
  {
    user_record: find_or_create_user(),
    dish_source_record: find_or_create_dish_source(),
  }
end

comparer.define_expectation do |_, prepared_records|
  expect(::DishSource.where(id: prepared_records[:dish_source_record].id).present?).to eq false
  expect(::User.where(id: prepared_records[:dish_source_record].user_id).present?).to eq true
end

COMPARERS[comparer.key] = comparer
