require_relative "./user_repository"
require_relative "./dish_repository"

FactoryBot.define do
  factory :dish do
    user { find_or_create_user() }
    name { DISH_NAME_OF_DISH }
    meal_position { 1 }
  end
end
