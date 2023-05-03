class DishSourceRelation < ApplicationRecord
  belongs_to :dish
  belongs_to :dish_source
end
