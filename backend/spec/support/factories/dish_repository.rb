DISH_NAME_OF_DISH ||= "カツ丼"

def find_or_create_dish
  ::Dish.find_by(name: DISH_NAME_OF_DISH) || FactoryBot.create(:dish)
end

DISH_NAME_OF_DISH_2 ||= "天丼"

def find_or_create_dish_2
  ::Dish.find_by(name: DISH_NAME_OF_DISH_2) || FactoryBot.create(:dish_2)
end
