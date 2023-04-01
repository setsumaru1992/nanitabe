module Queries::Dish
  class Dishes < ::Queries::BaseQuery
    argument :search_string, String, required: false

    type [::Types::Dish::Dish], null: false

    def resolve(search_string: nil)
      dishes = ::Dish.where(user_id: context[:current_user_id])
      dishes = dishes.where("name LIKE '%?%'", search_string) if search_string.present?
      dishes
    end
  end
end
