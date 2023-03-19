module Bussiness::Dish
  class Command::CreateCommand < ::Bussiness::Base::Command
    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :name, :string
    validates :name, presence: true

    attribute :meal_position, :integer
    validates :meal_position, presence: true

    attribute :comment, :string

    def call
      dish = Dish.new(
        user_id: user_id,
        name: name,
        meal_position: meal_position,
        comment: comment,
      )
      Repository.add(dish)
    end
  end
end