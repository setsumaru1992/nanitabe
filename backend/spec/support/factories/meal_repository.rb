require_relative "./user_repository"
require_relative "./dish_repository"

def find_or_create_meal
  existing_meal = ::Meal.find_by(
    dish: find_or_create_dish(),
  )
  existing_meal || FactoryBot.create(:meal)
end
