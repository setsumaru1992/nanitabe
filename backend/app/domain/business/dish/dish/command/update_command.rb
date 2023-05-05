module Business::Dish::Dish
  class Command::UpdateCommand < ::Business::Base::Command
    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :dish_for_update, :command_params
    validates :dish_for_update, presence: true

    attribute :dish_source_id, :integer
    validates :dish_source_id, presence: false

    attribute :dish_source_relation_detail, :command_params
    validates :dish_source_relation_detail, presence: false

    def call
      dish = Repository.find(dish_for_update.id)

      update_dish(dish, dish_for_update)
      # update_dish_source_relation(dish.id, dish_source_id, dish_source_relation_detail)

      dish
    end

    def update_dish(dish, dish_for_update)
      update_fields = extract_present_fields(
        dish_for_update.attributes, ignore_fields: [:id]
      )
      dish.assign_attributes(update_fields)

      Repository.update(dish, user_id)
    end

    def update_dish_source_relation(dish_id, dish_source_id, dish_source_relation_detail)
      if dish_source_id.blank?
        Repository.remove_dish_relation(dish_id, dish_source_id)
        return
      end

      Repository.put_dish_relation(dish_id, dish_source_id, dish_source_relation_detail)
    end
  end
end
