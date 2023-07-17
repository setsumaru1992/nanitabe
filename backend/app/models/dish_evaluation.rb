class DishEvaluation < ApplicationRecord
  self.primary_keys = :dish_id
  belongs_to :user
  belongs_to :dish
end
