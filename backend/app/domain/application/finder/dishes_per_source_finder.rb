module Application::Finder
  class DishesPerSourceFinder < Business::Base::Finder
    attribute :access_user_id, :integer
    validates :access_user_id, presence: true

    def fetch
      dishes = ::Dish.where(user_id: access_user_id).eager_load(:meals).eager_load(:dish_source_relation)
      dishes_per_source = group_rows_by_key(dishes, :dish_source_id, :dishes) do |dish|
        dish&.dish_source_relation&.dish_source_id
      end
      dishes_per_source.map do |dish_per_source|
        {
          source_id: dish_per_source[:dish_source_id],
          dishes_per_meal_position: group_rows_by_key(dish_per_source[:dishes], :meal_position, :dishes),
        }
      end
    end
  end
end
