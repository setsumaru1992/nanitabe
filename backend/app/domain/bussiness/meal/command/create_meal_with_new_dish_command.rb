module Bussiness::Meal
  class Command::CreateMealWithNewDishCommand < ::Bussiness::Base::Command
    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :dish_for_create, :command_params
    validates :dish_for_create, presence: true

    attribute :meal_for_create, :command_params
    validates :meal_for_create, presence: true

    def call
      created_dish = ::Bussiness::Dish::Command::CreateCommand.call(
        user_id: user_id,
        dish_for_create: dish_for_create,
      )

      Command::CreateMealWithExistingDishCommand.call(
        user_id: user_id,
        dish_id: created_dish.id,
        meal_for_create: meal_for_create
      )
    end
  end
end