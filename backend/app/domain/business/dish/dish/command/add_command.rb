module Business::Dish::Dish
  class Command::AddCommand < ::Business::Base::Command
    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :dish_for_create, :command_params
    validates :dish_for_create, presence: true

    attribute :dish_source_for_read, :command_params
    validates :dish_source_for_read, presence: false

    attribute :dish_source_relation_detail, :command_params
    validates :dish_source_relation_detail, presence: false

    def call
      dish = Dish.new(
        user_id:,
        name: dish_for_create.name,
        meal_position: dish_for_create.meal_position,
        comment: dish_for_create.comment,
      )

      created_dish = Repository.add(dish)

      can_register_dish_source_relation = dish_source_relation_detail.present? && dish_source_for_read.present?
      return created_dish unless can_register_dish_source_relation

      Repository.put_dish_source_relation(created_dish.id, dish_source_for_read.id, dish_source_relation_detail.detail_values)

      created_dish
    end
  end
end
