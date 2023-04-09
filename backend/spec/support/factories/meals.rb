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
