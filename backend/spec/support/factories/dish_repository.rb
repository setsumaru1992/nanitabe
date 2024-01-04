DISH_NAME_OF_DISH ||= "カツ丼"

def find_or_create_dish
  ::Dish.find_by(name: DISH_NAME_OF_DISH) || FactoryBot.create(:dish)
end

DISH_NAME_OF_DISH_2 ||= "天丼"

def find_or_create_dish_2
  ::Dish.find_by(name: DISH_NAME_OF_DISH_2) || FactoryBot.create(:dish_2)
end

(1..4).each do |idx|
  eval <<-DISH_OF_DAY_WITH_MEAL
    DISH_NAME_OF_DAY_WITH_MULTI_MEALS_#{idx} ||= "DISH_NAME_OF_DAY_WITH_MULTI_MEALS_#{idx}"

    def find_or_create_dish_of_day_with_multi_meals_#{idx}
      ::Dish.find_by(name: DISH_NAME_OF_DAY_WITH_MULTI_MEALS_#{idx}) || FactoryBot.create(:dish_of_day_with_multi_meals_#{idx})
    end

    DISH_NAME_OF_DAY_WITH_MEAL_#{idx} ||= "DISH_NAME_OF_DAY_WITH_MEAL_#{idx}"

    def find_or_create_dish_of_day_with_meal_#{idx}
      ::Dish.find_by(name: DISH_NAME_OF_DAY_WITH_MEAL_#{idx}) || FactoryBot.create(:dish_of_day_with_meal_#{idx})
    end
  DISH_OF_DAY_WITH_MEAL
end
