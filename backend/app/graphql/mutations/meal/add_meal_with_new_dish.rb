module Mutations::Meal
  class AddMealWithNewDish < ::Mutations::BaseMutation
    argument :dish, ::Types::Input::Dish::DishForCreate, required: true
    argument :dish_source, ::Types::Input::Dish::Source::SourceForRead, required: true
    argument :dish_source_relation_detail, ::Types::Input::Dish::DishSourceRelation::DishSourceRelationDetail, required: false
    argument :meal, ::Types::Input::Meal::MealForCreate, required: true

    field :meal_id, Int, null: false
    field :dish_id, Int, null: false

    def resolve(dish:, meal:, dish_source:, dish_source_relation_detail: nil)
      ActiveRecord::Base.transaction do
        created_meal, created_dish = ::Business::Dish::Command::Meal::AddMealWithNewDishCommand.call(
          user_id: context[:current_user_id],
          dish_for_create: dish.convert_to_command_param,
          dish_source_for_read: dish_source.convert_to_command_param,
          dish_source_relation_detail: dish_source_relation_detail&.convert_to_command_param(dish_source&.type),
          meal_for_create: meal.convert_to_command_param,
        )
        {
          meal_id: created_meal.id,
          dish_id: created_dish.id,
        }
      end
    end
  end
end
