module Business::Dish::Dish
  class Command::RemoveCommand < ::Business::Base::Command
    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :dish_id, :integer
    validates :dish_id, presence: true

    def call
      Repository.remove(dish_id, user_id)
    end
  end
end
