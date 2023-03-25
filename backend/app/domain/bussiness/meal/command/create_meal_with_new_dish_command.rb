module Bussiness::Meal
  class Command::CreateMealWithNewDishCommand < ::Bussiness::Base::Command
    # TODO: dishとmealを何かしらのオブジェクトで受け入れられるようにしたい
    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :dish_name, :string
    validates :dish_name, presence: true

    attribute :dish_meal_position, :integer
    validates :dish_meal_position, presence: true

    attribute :dish_comment, :string

    attribute :meal_date, :date
    validates :meal_date, presence: true

    attribute :meal_type, :integer
    validates :meal_type, presence: true

    attribute :meal_comment, :string

    def call
      created_dish = ::Bussiness::Dish::Command::CreateCommand.call(
        user_id: user_id,
        name: dish_name,
        meal_position: dish_meal_position,
        comment: dish_comment,
      )

      Command::CreateMealWithExistingDishCommand.call(
        user_id: user_id,
        dish_id: created_dish.id,
        date: meal_date,
        meal_type: meal_type,
        comment: meal_comment,
      )
    end
  end
end