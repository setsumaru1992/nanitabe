NAME_OF_DISH_SOURCE ||= "はじめての中華料理"

def find_or_create_dish_source
  ::DishSource.find_by(name: NAME_OF_DISH_SOURCE) || FactoryBot.create(:dish_source)
end
