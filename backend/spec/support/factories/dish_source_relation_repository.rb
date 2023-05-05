require_relative "./dish_repository"
require_relative "./dish_sources_repository"

def find_or_create_dish_source_relation(dish_id: nil, dish_source_id: nil)
  dish_id ||= find_or_create_dish().id
  dish_source_id ||= find_or_create_dish_source().id
  ::DishSourceRelation.find_by(dish_id:, dish_source_id:) || FactoryBot.create(:dish_source_relation)
end
