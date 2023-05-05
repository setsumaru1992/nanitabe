class Dish < ApplicationRecord
  belongs_to :user
  has_many :meals
  has_many :dish_source_relations, dependent: :destroy
end
