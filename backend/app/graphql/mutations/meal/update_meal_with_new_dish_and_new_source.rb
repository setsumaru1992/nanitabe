module Mutations::Meal
  class UpdateMealWithNewDishAndNewSource < ::Mutations::BaseMutation
    argument :meal, ::Types::Input::Meal::MealForUpdate, required: true
    argument :dish, ::Types::Input::Dish::DishForCreate, required: true
    argument :dish_source, ::Types::Input::Dish::Source::SourceForCreate, required: true
    argument :dish_source_relation_detail, ::Types::Input::Dish::DishSourceRelation::DishSourceRelationDetail, required: false

    field :meal_id, Int, null: false
    field :dish_id, Int, null: false
    field :dish_source_id, Int, null: false

    def resolve(meal:, dish:, dish_source:, dish_source_relation_detail: nil)
      ActiveRecord::Base.transaction do
        _, created_dish, created_dish_source = ::Business::Dish::Command::Meal::UpdateMealWithNewDishAndNewSourceCommand.call(
          user_id: context[:current_user_id],
          dish_for_create: dish.convert_to_command_param,
          dish_source_for_create: dish_source.convert_to_command_param,
          dish_source_relation_detail: dish_source_relation_detail&.convert_to_command_param(dish_source&.type),
          meal_for_update: meal.convert_to_command_param,
        )
        {
          meal_id: meal.id,
          dish_id: created_dish.id,
          dish_source_id: created_dish_source.id,
        }
      end
    end
  end
end
