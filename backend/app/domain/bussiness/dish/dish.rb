module Bussiness::Dish
  class Dish < ::Bussiness::Base::Entity
    attribute :id, :integer

    attribute :user_id, :integer
    validates :user_id, :integer, presence: true

    attribute :name, :string
    validates :name, :string, presence: true

    attribute :meal_position, :integer
    validates :meal_position, :integer, presence: true

    attribute :comment, :string
  end
end
