require_relative "./user_repository"
require_relative "./dish_repository"
require_relative "./dish_tag_repository"

FactoryBot.define do
  factory :dish_tag do
    user { find_or_create_user() }
    dish { find_or_create_dish() }
    content { DISH_CONTENT_OF_DISH }
  end
end

FactoryBot.define do
  factory :dish_tag_2, class: DishTag do
    user { find_or_create_user() }
    dish { find_or_create_dish() }
    content { DISH_CONTENT_OF_DISH_2 }
  end
end
