module Mutations::Dish
  class UpdateDishWithNewSource < ::Mutations::BaseMutation
    argument :dish, ::Types::Input::Dish::DishForUpdate, required: true
    argument :dish_source, ::Types::Input::Dish::Source::SourceForCreate, required: true
    argument :dish_source_relation_detail, ::Types::Input::Dish::DishSourceRelation::DishSourceRelationDetail, required: false
    argument :dish_tags, [::Types::Input::Dish::Tag::Tag], required: false

    field :dish_id, Int, null: false

    def resolve(dish:, dish_source:, dish_source_relation_detail:, dish_tags: nil)
      ActiveRecord::Base.transaction do
        _, created_dish_source = ::Business::Dish::Dish::Command::UpdateWithNewSourceCommand.call(
          user_id: context[:current_user_id],
          dish_for_update: dish.convert_to_command_param,
          dish_source_for_create: dish_source.convert_to_command_param,
          dish_source_relation_detail_value: dish_source_relation_detail&.detail_value_of(dish_source.type),
          dish_tags: (dish_tags || [])&.map {|dish_tag| dish_tag.convert_to_command_param},
        )

        {
          dish_id: dish.id,
          dish_source_id: created_dish_source.id,
        }
      end
    end
  end
end
