module Business::Dish
  module Command::Meal::Update
    class UpdateMealWithNewDishCommand < ::Business::Base::Command
      attribute :user_id, :integer
      validates :user_id, presence: true

      attribute :dish_for_create, :command_params
      validates :dish_for_create, presence: true

      attribute :meal_for_update, :command_params
      validates :meal_for_update, presence: true

      def call
        created_dish = ::Business::Dish::Dish::Command::CreateCommand.call(
          user_id:,
          dish_for_create:,
        )

        meal_for_update.dish_id = created_dish.id
        ::Business::Dish::Meal::Command::UpdateMealCommand.call(
          user_id:,
          meal_for_update:,
        )

        meal_for_update
      end
    end
  end
end
