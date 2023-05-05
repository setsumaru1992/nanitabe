require_relative "./user_repository"
require_relative "./dish_repository"
require_relative "./dish_sources_repository"

FactoryBot.define do
  factory :dish_source_relation do
    dish { find_or_create_dish() }
    dish_source { find_or_create_dish_source() }
    recipe_book_page { 32 }
    recipe_website_url { nil }
    recipe_source_memo { nil }
  end
end
