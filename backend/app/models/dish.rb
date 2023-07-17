class Dish < ApplicationRecord
  belongs_to :user
  has_many :meals

  has_one :dish_source_relation, dependent: :destroy
  has_one :dish_source, through: :dish_source_relation

  has_one :dish_evaluation, dependent: :destroy
end
