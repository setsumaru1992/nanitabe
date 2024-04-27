module Types::Output::Dish
  class DishTag < ::Types::BaseObject
    field :id, Int, null: false
    field :dish_id, Int, null: false
    field :content, String, null: false
  end
end
