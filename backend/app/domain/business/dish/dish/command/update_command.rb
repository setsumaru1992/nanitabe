module Business::Dish::Dish
  class Command::UpdateCommand < ::Business::Base::Command
    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :dish_for_update, :command_params
    validates :dish_for_update, presence: true

    def call
      dish = Repository.find(dish_for_update.id)

      update_fields = extract_present_fields(
        dish_for_update.attributes, ignore_fields: [:id]
      )
      dish.assign_attributes(update_fields)

      Repository.update(dish, user_id)
      dish
    end
  end
end
