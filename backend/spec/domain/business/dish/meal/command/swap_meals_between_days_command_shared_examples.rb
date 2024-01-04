KEY_OF_TEST_SWAP_FROM_DAY_WITH_MEALS_TO_DAY_WITH_MEALS = "SWAP_FROM_DAY_WITH_MEALS_TO_DAY_WITH_MEALS"
comparer = ExpectationComparer.new(KEY_OF_TEST_SWAP_FROM_DAY_WITH_MEALS_TO_DAY_WITH_MEALS, {
  from_date: Date.new(2023, 02, 01),
  to_date: Date.new(2023, 02, 02),
  meal_type: 1,
})

comparer.define_required_records_for_test do
  {
    user_record: find_or_create_user,
    meal_of_day_1_with_multi_meals_1_record: find_or_create_meal_of_day_1_with_multi_meals_1,
    meal_of_day_1_with_multi_meals_2_record: find_or_create_meal_of_day_1_with_multi_meals_2,
    meal_of_day_2_with_multi_meals_1_record: find_or_create_meal_of_day_2_with_multi_meals_1,
    meal_of_day_2_with_multi_meals_2_record: find_or_create_meal_of_day_2_with_multi_meals_2,
  }
end

comparer.define_expectation do |expected_values, prepared_records|
  meal_ids_of_from_day_after_exec = ::Meal.where(date: expected_values[:from_date]).map(&:id)
  expect(meal_ids_of_from_day_after_exec).to eq [
                                                  prepared_records[:meal_of_day_2_with_multi_meals_1_record].id,
                                                  prepared_records[:meal_of_day_2_with_multi_meals_2_record].id,
                                                ]

  meal_ids_of_to_day_after_exec = ::Meal.where(date: expected_values[:to_date]).map(&:id)
  expect(meal_ids_of_to_day_after_exec).to eq [
                                                  prepared_records[:meal_of_day_1_with_multi_meals_1_record].id,
                                                  prepared_records[:meal_of_day_1_with_multi_meals_2_record].id,
                                                ]

  # added_meal_record = ::Meal.last
  # expect(added_meal_record.date).to eq expected_values[:date]
  # expect(added_meal_record.meal_type).to eq expected_values[:meal_type]
  # expect(added_meal_record.user_id).to eq prepared_records[:user_record].id
  # if expected_values.key? :dish_id
  #   expect(added_meal_record.dish_id).to eq expected_values[:dish_id]
  # else
  #   expect(added_meal_record.dish_id).to eq prepared_records[:dish_record].id
  # end
end

COMPARERS[comparer.key] = comparer