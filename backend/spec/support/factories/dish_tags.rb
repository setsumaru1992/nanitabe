require_relative "./user_repository"
require_relative "./dish_repository"

FactoryBot.define do
  factory :dish_tag do
    user { find_or_create_user() }
    dish { find_or_create_dish() }
    content { "白ワインに合う" }
  end
end
