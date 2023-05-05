require_relative "../../../../../support/factories/user_repository"
require_relative "../../../../../support/factories/dish_repository"
require_relative "../../../../../support/factories/dish_sources_repository"

KEY_OF_TEST_DISH_SOURCE_RELATION_SHOULD_BE_REMOVED = "DISH_SOURCE_RELATION_SHOULD_BE_REMOVED"
comparer = ExpectationComparer.new(KEY_OF_TEST_DISH_SOURCE_RELATION_SHOULD_BE_REMOVED, {})

comparer.define_required_records_for_test do
  {
    user_record: find_or_create_user(),
    dish_record: find_or_create_dish(),
    dish_source_record: find_or_create_dish_source(),
    dish_source_relation_record: find_or_create_dish_source_relation(),
  }
end

comparer.define_expectation do |_, prepared_records|
  expect(
    ::DishSourceRelation.find_by(
      dish_id: prepared_records[:dish_source_relation_record].dish_id,
      dish_source_id: prepared_records[:dish_source_relation_record].dish_source_id,
    ).present?,
  ).to eq false
end

COMPARERS[comparer.key] = comparer
