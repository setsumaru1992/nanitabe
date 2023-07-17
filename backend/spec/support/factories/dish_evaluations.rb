require_relative "./user_repository"
require_relative "./dish_sources_repository"

FactoryBot.define do
  factory :dish_evaluation do
    user { find_or_create_user() }
    dish { find_or_create_dish() }
    score { 3.0 }
  end
end
