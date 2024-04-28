module Mutations::Meal
  class UpdateMealWithNewDish < ::Mutations::BaseMutation
    argument :meal, ::Types::Input::Meal::MealForUpdate, required: true
    argument :dish, ::Types::Input::Dish::DishForCreate, required: true
    argument :dish_source, ::Types::Input::Dish::Source::SourceForRead, required: true
    argument :dish_source_relation_detail, ::Types::Input::Dish::DishSourceRelation::DishSourceRelationDetail, required: false
    argument :dish_tags, [::Types::Input::Dish::Tag::Tag], required: false

    field :meal_id, Int, null: false
    field :dish_id, Int, null: false

    def resolve(meal:, dish:, dish_source:, dish_source_relation_detail: nil, dish_tags: nil)
      ActiveRecord::Base.transaction do
        updated_meal, created_dish = ::Business::Dish::Command::Meal::UpdateMealWithNewDishCommand.call(
          user_id: context[:current_user_id],
          dish_for_create: dish.convert_to_command_param,
          dish_source_for_read: dish_source.convert_to_command_param,
          dish_source_relation_detail: dish_source_relation_detail&.convert_to_command_param(dish_source&.type),
          dish_tags: (dish_tags || [])&.map {|dish_tag| dish_tag.convert_to_command_param},
          meal_for_update: meal.convert_to_command_param,
        )
        {
          meal_id: updated_meal.id,
          dish_id: created_dish.id,
        }
      end
    end
  end
end
