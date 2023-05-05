require_relative "./user_repository"
require_relative "./dish_sources_repository"

FactoryBot.define do
  factory :dish_source do
    user { find_or_create_user() }
    name { NAME_OF_DISH_SOURCE }
    type { ::Business::Dish::Dish::Source::Type::RECIPE_BOOK }
    comment { "初心者向け" }
  end

  factory :dish_source_of_youtube, class: DishSource do
    user { find_or_create_user() }
    name { NAME_OF_DISH_SOURCE_OF_YOUTUBE }
    type { ::Business::Dish::Dish::Source::Type::YOUTUBE }
    comment { "" }
  end

  factory :dish_source_of_other, class: DishSource do
    user { find_or_create_user() }
    name { NAME_OF_DISH_SOURCE_OF_OTHER }
    type { ::Business::Dish::Dish::Source::Type::RESTAURANT }
    comment { "" }
  end
end
