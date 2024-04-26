require_relative "../../../../../../support/factories/user_repository"
require_relative "../../../../../../support/factories/dish_tag_repository"

KEY_OF_TEST_DISH_TAG_SHOULD_BE_REMOVED = "DISH_TAG_SHOULD_BE_REMOVED"
comparer = ExpectationComparer.new(KEY_OF_TEST_DISH_TAG_SHOULD_BE_REMOVED, {})

comparer.define_required_records_for_test do
  {
    user_record: find_or_create_user(),
    dish_record: find_or_create_dish(),
    dish_tag_record: find_or_create_dish_tag(),
  }
end

comparer.define_expectation do |_, prepared_records|
  expect(::DishTag.where(id: prepared_records[:dish_tag_record].id).present?).to eq false
  expect(::User.where(id: prepared_records[:dish_tag_record].user_id).present?).to eq true
end

COMPARERS[comparer.key] = comparer
