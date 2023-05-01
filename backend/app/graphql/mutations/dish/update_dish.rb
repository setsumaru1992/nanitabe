module Mutations::Dish
  class UpdateDish < ::Mutations::BaseMutation
    argument :dish, ::Types::Input::Dish::DishForUpdate, required: true

    field :dish_id, Int, null: false

    def resolve(dish:)
      ActiveRecord::Base.transaction do
        ::Business::Dish::Dish::Command::UpdateCommand.call(
          user_id: context[:current_user_id],
          dish_for_update: ::Business::Dish::Dish::Command::Params::DishForUpdate.new(
            id: dish.id,
            name: dish.name,
            meal_position: dish.meal_position,
            comment: dish.comment,
          ),
        )

        {
          dish_id: dish.id,
        }
      end
    end
  end
end
