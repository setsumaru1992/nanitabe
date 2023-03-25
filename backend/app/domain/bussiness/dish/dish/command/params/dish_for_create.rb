module Bussiness::Dish::Dish
  class Command::Params::DishForCreate < ::Bussiness::Base::CommandParams
    attribute :name, :string
    validates :name, presence: true

    attribute :meal_position, :integer
    validates :meal_position, presence: true

    attribute :comment, :string
  end
end