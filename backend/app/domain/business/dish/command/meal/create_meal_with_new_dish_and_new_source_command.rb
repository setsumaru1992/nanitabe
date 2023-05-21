module Business::Dish
  module Command::Meal
    class CreateMealWithNewDishAndNewSourceCommand < ::Business::Base::Command
      attribute :user_id, :integer
      validates :user_id, presence: true

      attribute :dish_for_create, :command_params
      validates :dish_for_create, presence: true

      attribute :dish_source_for_create, :command_params
      validates :dish_source_for_create, presence: false

      attribute :dish_source_relation_detail, :command_params
      validates :dish_source_relation_detail, presence: false

      attribute :meal_for_create, :command_params
      validates :meal_for_create, presence: true

      def call
        created_dish_source = Dish::Source::Command::CreateCommand.call(
          user_id:,
          dish_source_for_create:,
        )

        created_meal, created_dish = CreateMealWithNewDishCommand.call(
          user_id:,
          dish_for_create:,
          dish_source_for_read: Dish::Source::Command::Params::SourceForRead.new(
            id: created_dish_source.id,
            type: created_dish_source.type,
          ),
          dish_source_relation_detail:,
          meal_for_create:,
        )

        [created_meal, created_dish, created_dish_source]
      end
    end
  end
end
