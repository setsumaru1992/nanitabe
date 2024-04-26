require_relative "./dish_repository"

DISH_CONTENT_OF_DISH ||= "白ワインに合う"

def find_or_create_dish_tag
  ::DishTag.find_by(content: DISH_CONTENT_OF_DISH) || FactoryBot.create(:dish_tag)
end

DISH_CONTENT_OF_DISH_2 ||= "日本酒に合う"

def find_or_create_dish_tag2
  ::DishTag.find_by(content: DISH_CONTENT_OF_DISH_2) || FactoryBot.create(:dish_tag_2)
end
