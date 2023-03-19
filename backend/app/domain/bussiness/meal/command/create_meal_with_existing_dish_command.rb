module Bussiness::Meal
  class Command::CreateMealWithExistingDishCommand < ::Bussiness::Base::Command
    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :dish_id, :integer
    validates :dish_id, presence: true

    attribute :date, :date
    validates :date, presence: true

    attribute :meal_type, :integer
    validates :meal_type, presence: true

    attribute :comment, :string

    def call
      meal = Meal.new(
        user_id: user_id,
        dish_id: dish_id,
        date: date,
        meal_type: meal_type,
        comment: comment,
      )
      Repository.add(meal)
    end
  end
end