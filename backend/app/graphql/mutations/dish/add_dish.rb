module Mutations::Dish
  class AddDish < ::Mutations::BaseMutation
    argument :dish, ::Types::Input::Dish::DishForCreate, required: true

    field :dish_id, Int, null: false

    def resolve(dish:)
      ActiveRecord::Base.transaction do
        created_dish = ::Business::Dish::Dish::Command::CreateCommand.call(
          user_id: context[:current_user_id],
          dish_for_create: ::Business::Dish::Dish::Command::Params::DishForCreate.new(
            name: dish.name,
            meal_position: dish.meal_position,
            comment: dish.comment,
          ),
        )

        {
          dish_id: created_dish.id,
        }
      end
    end
  end
end
