module Mutations::Dish
  class UpdateDish < ::Mutations::BaseMutation
    argument :dish, ::Types::Input::Dish::DishForUpdate, required: true
    argument :dish_source_relation, ::Types::Input::Dish::DishSourceRelation::DishSourceRelationForUpdate, required: false
    argument :dish_tags, [::Types::Input::Dish::Tag::Tag], required: false

    field :dish_id, Int, null: false

    def resolve(dish:, dish_source_relation:, dish_tags: nil)
      ActiveRecord::Base.transaction do
        ::Business::Dish::Dish::Command::UpdateCommand.call(
          user_id: context[:current_user_id],
          dish_for_update: dish.convert_to_command_param,
          dish_source_relation: dish_source_relation&.convert_to_command_param,
          dish_tags: (dish_tags || [])&.map {|dish_tag| dish_tag.convert_to_command_param},
        )

        {
          dish_id: dish.id,
        }
      end
    end
  end
end
