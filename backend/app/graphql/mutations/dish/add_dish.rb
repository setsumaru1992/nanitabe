module Mutations::Dish
  class AddDish < ::Mutations::BaseMutation
    argument :dish, ::Types::Input::Dish::DishForCreate, required: true
    argument :dish_source, ::Types::Input::Dish::Source::SourceForRead, required: false
    argument :dish_source_relation_detail, ::Types::Input::Dish::DishSourceRelation::DishSourceRelationDetail, required: false

    field :dish_id, Int, null: false

    def resolve(dish:, dish_source: nil, dish_source_relation_detail: nil)
      ActiveRecord::Base.transaction do
        created_dish = ::Business::Dish::Dish::Command::CreateCommand.call(
          user_id: context[:current_user_id],
          dish_for_create: dish.convert_to_command_param,
          dish_source_for_read: dish_source.convert_to_command_param,
          dish_source_relation_detail: dish_source_relation_detail&.convert_to_command_param(dish_source&.type),
        )

        {
          dish_id: created_dish.id,
        }
      end
    end
  end
end
