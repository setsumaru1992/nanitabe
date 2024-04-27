module Mutations::Meal
  class AddMealWithNewDishAndNewSource < ::Mutations::BaseMutation
    argument :dish, ::Types::Input::Dish::DishForCreate, required: true
    argument :meal, ::Types::Input::Meal::MealForCreate, required: true
    argument :dish_source, ::Types::Input::Dish::Source::SourceForCreate, required: true
    argument :dish_source_relation_detail, ::Types::Input::Dish::DishSourceRelation::DishSourceRelationDetail, required: false
    argument :dish_tags, [::Types::Input::Dish::Tag::Tag], required: false

    field :meal_id, Int, null: false
    field :dish_id, Int, null: false
    field :dish_source_id, Int, null: false

    def resolve(dish:, meal:, dish_source:, dish_source_relation_detail: nil, dish_tags: nil)
      ActiveRecord::Base.transaction do
        created_meal, create_dish, created_dish_source = ::Business::Dish::Command::Meal::AddMealWithNewDishAndNewSourceCommand.call(
          user_id: context[:current_user_id],
          dish_for_create: dish.convert_to_command_param,
          dish_source_for_create: dish_source.convert_to_command_param,
          dish_source_relation_detail: dish_source_relation_detail&.convert_to_command_param(dish_source&.type),
          dish_tags: (dish_tags || [])&.map {|dish_tag| dish_tag.convert_to_command_param},
          meal_for_create: meal.convert_to_command_param,
        )
        {
          meal_id: created_meal.id,
          dish_id: create_dish.id,
          dish_source_id: created_dish_source.id,
        }
      end
    end
  end
end
