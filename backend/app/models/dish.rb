class Dish < ApplicationRecord
  belongs_to :user
  has_many :meals
  has_one :dish_source_relation, dependent: :destroy
end
