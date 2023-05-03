FactoryBot.define do
  factory :dish_source_relation do
    dish { nil }
    dish_source { nil }
    recipe_book_page { 1 }
    recipe_website_url { 1 }
    recipe_source_memo { "MyString" }
  end
end
