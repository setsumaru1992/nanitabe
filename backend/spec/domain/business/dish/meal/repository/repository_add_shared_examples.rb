KEY_OF_TEST_MEAL_SHOULD_BE_CREATED = "MEAL_SHOULD_BE_CREATED"
comparer = ExpectationComparer.new(KEY_OF_TEST_MEAL_SHOULD_BE_CREATED, {
  date: Date.new(2023, 03, 19),
  meal_type: 1,
})

comparer.define_required_records_for_test do
  {
    user_record: ::User.find_by(id_param: "userrrrrrrrrrrrrrr") || FactoryBot.create(:user),
    dish_record: FactoryBot.create(:dish),
  }
end

comparer.define_expectation do |expected_values, prepared_records|
  added_meal_record = ::Meal.last
  expect(added_meal_record.date).to eq expected_values[:date]
  expect(added_meal_record.meal_type).to eq expected_values[:meal_type]
  expect(added_meal_record.user_id).to eq prepared_records[:user_record].id
  if expected_values.key? :dish_id
    expect(added_meal_record.dish_id).to eq expected_values[:dish_id]
  else
    expect(added_meal_record.dish_id).to eq prepared_records[:dish_record].id
  end
end

COMPARERS[comparer.key] = comparer

KEY_OF_TEST_MEAL_SHOULD_BE_CREATED_WITH_FULL_FIELD = "MEAL_SHOULD_BE_CREATED_WITH_FULL_FIELD"
comparer = ExpectationComparer.new(KEY_OF_TEST_MEAL_SHOULD_BE_CREATED_WITH_FULL_FIELD, {
  date: Date.new(2023, 03, 19),
  meal_type: 1,
  comment: "夕飯ぬ"
})

comparer.define_required_records_for_test do
  {
    user_record: ::User.find_by(id_param: "userrrrrrrrrrrrrrr") || FactoryBot.create(:user),
    dish_record: FactoryBot.create(:dish),
  }
end

comparer.define_expectation do |expected_values, prepared_records|
  added_meal_record = ::Meal.last
  expect(added_meal_record.date).to eq expected_values[:date]
  expect(added_meal_record.meal_type).to eq expected_values[:meal_type]
  expect(added_meal_record.comment).to eq expected_values[:comment]
  expect(added_meal_record.user_id).to eq prepared_records[:user_record].id
  if expected_values.key? :dish_id
    expect(added_meal_record.dish_id).to eq expected_values[:dish_id]
  else
    expect(added_meal_record.dish_id).to eq prepared_records[:dish_record].id
  end
end

COMPARERS[comparer.key] = comparer
