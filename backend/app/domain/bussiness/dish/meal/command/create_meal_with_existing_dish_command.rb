module Bussiness::Dish::Meal
  class Command::CreateMealWithExistingDishCommand < ::Bussiness::Base::Command
    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :dish_id, :integer
    validates :dish_id, presence: true

    attribute :meal_for_create, :command_params
    validates :meal_for_create, presence: true


    def call
      meal = Meal.new(
        user_id: user_id,
        dish_id: dish_id,
        date: meal_for_create.date,
        meal_type: meal_for_create.meal_type,
        comment: meal_for_create.comment,
      )
      Repository.add(meal)
    end
  end
end