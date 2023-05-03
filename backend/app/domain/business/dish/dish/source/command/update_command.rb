module Business::Dish::Dish::Source
  class Command::UpdateCommand < ::Business::Base::Command
    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :dish_source_for_update, :command_params
    validates :dish_source_for_update, presence: true

    def call
      dish_source = Repository.find(dish_source_for_update.id)

      update_fields = extract_present_fields(
        dish_source_for_update.attributes, ignore_fields: [:id]
      )
      dish_source.assign_attributes(update_fields)

      Repository.update(dish_source, user_id)
      dish_source
    end
  end
end
