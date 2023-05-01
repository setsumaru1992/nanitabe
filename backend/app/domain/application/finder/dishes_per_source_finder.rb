module Application::Finder
  class DishesPerSourceFinder < Business::Base::Finder
    attribute :access_user_id, :integer
    validates :access_user_id, presence: true

    def fetch
      # TODO: sourceのデータができたら紐つける
      dishes = ::Dish.where(user_id: access_user_id)
      dishes_per_source = group_rows_by_key(dishes, :source_id, :dishes)
      dishes_per_source.map do |dish_per_source|
        {
          source_id: dish_per_source[:source_id],
          dishes_per_meal_position: group_rows_by_key(dish_per_source[:dishes], :meal_position, :dishes),
        }
      end
    end
  end
end
