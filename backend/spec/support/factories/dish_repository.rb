DISH_NAME_OF_DISH ||= "カツ丼"

def find_or_create_dish
  ::Dish.find_by(name: DISH_NAME_OF_DISH) || FactoryBot.create(:dish)
end
