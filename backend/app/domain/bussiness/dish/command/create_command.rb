module Bussiness::Dish
  class Command::CreateCommand < ::Bussiness::Base::Command
    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :dish_for_create, :command_params
    validates :dish_for_create, presence: true

    def call
      dish = Dish.new(
        user_id: user_id,
        name: dish_for_create.name,
        meal_position: dish_for_create.meal_position,
        comment: dish_for_create.comment,
      )
      Repository.add(dish)
    end
  end
end