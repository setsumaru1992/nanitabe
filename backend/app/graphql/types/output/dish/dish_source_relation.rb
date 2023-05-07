module Types::Output::Dish
  class DishSourceRelation < ::Types::BaseObject
    field :dish_id, Int, null: false
    field :dish_source_id, Int, null: false
    field :type, Int, null: false

    field :recipe_book_page, Int, null: true
    field :recipe_website_url, String, null: true
    field :recipe_source_memo, String, null: true
  end
end
