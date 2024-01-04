require_relative "./user_repository"
require_relative "./dish_repository"
require_relative "./meal_repository"

FactoryBot.define do
  factory :meal do
    user { find_or_create_user() }
    date { Date.new(2023, 03, 19) }
    meal_type { 1 }
    dish { find_or_create_dish() }
  end
end

FactoryBot.define do
  factory :meal_of_day_1_with_multi_meals_1, class: Meal do
    user { find_or_create_user() }
    date { Date.new(2023, 02, 01) }
    meal_type { 1 }
    dish { find_or_create_dish_of_day_with_multi_meals_1() }
  end

  factory :meal_of_day_1_with_multi_meals_2, class: Meal do
    user { find_or_create_user() }
    date { Date.new(2023, 02, 01) }
    meal_type { 1 }
    dish { find_or_create_dish_of_day_with_multi_meals_2() }
  end

  factory :meal_of_day_2_with_multi_meals_1, class: Meal do
    user { find_or_create_user() }
    date { Date.new(2023, 02, 02) }
    meal_type { 1 }
    dish { find_or_create_dish_of_day_with_multi_meals_3() }
  end

  factory :meal_of_day_2_with_multi_meals_2, class: Meal do
    user { find_or_create_user() }
    date { Date.new(2023, 02, 02) }
    meal_type { 1 }
    dish { find_or_create_dish_of_day_with_multi_meals_4() }
  end

  factory :meal_of_day_2_with_multi_meals_3, class: Meal do
    user { find_or_create_user() }
    date { Date.new(2023, 02, 02) }
    meal_type { 1 }
    dish { find_or_create_dish_of_day_with_multi_meals_5() }
  end

  factory :meal_of_day_1_with_meal, class: Meal do
    user { find_or_create_user() }
    date { Date.new(2023, 02, 11) }
    meal_type { 1 }
    dish { find_or_create_dish_of_day_with_meal_1() }
  end

  factory :meal_of_day_2_with_meal, class: Meal do
    user { find_or_create_user() }
    date { Date.new(2023, 02, 12) }
    meal_type { 1 }
    dish { find_or_create_dish_of_day_with_meal_2() }
  end
end
