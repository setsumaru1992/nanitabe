KEY_OF_TEST_DISH_SHOULD_BE_CREATED = "DISH_SHOULD_BE_CREATED"
comparer = ExpectationComparer.new(KEY_OF_TEST_DISH_SHOULD_BE_CREATED, {
  name: "カツ丼",
  meal_position: 1,
})

comparer.define_required_records_for_test do
  {
    user_record: FactoryBot.create(:user)
  }
end

comparer.define_expectation do |expected_values, prepared_records|
  added_dish_record = ::Dish.last
  expect(added_dish_record.name).to eq expected_values[:name]
  expect(added_dish_record.meal_position).to eq expected_values[:meal_position]
  expect(added_dish_record.user_id).to eq prepared_records[:user_record].id
end

COMPARERS[comparer.key] = comparer