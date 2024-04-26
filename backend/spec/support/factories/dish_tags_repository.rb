require_relative "./dish_repository"

def find_or_create_dish_tag
  ::DishTag.find_by(dish_id: find_or_create_dish().id) || FactoryBot.create(:dish_tag)
end
