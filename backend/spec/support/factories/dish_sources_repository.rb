NAME_OF_DISH_SOURCE ||= "はじめての中華料理"

def find_or_create_dish_source
  ::DishSource.find_by(name: NAME_OF_DISH_SOURCE) || FactoryBot.create(:dish_source)
end

NAME_OF_DISH_SOURCE_OF_YOUTUBE ||= "りゅうじ"

def find_or_create_dish_source_of_youtube
  ::DishSource.find_by(name: NAME_OF_DISH_SOURCE_OF_YOUTUBE) || FactoryBot.create(:dish_source_of_youtube)
end

NAME_OF_DISH_SOURCE_OF_OTHER ||= "蒲田駅"

def find_or_create_dish_source_of_other
  ::DishSource.find_by(name: NAME_OF_DISH_SOURCE_OF_OTHER) || FactoryBot.create(:dish_source_of_other)
end
