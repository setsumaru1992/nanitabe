module Business::Dish::Dish::Source
  class Command::RemoveCommand < ::Business::Base::Command
    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :dish_source_id, :integer
    validates :dish_source_id, presence: true

    def call
      Repository.remove(dish_source_id, user_id)
    end
  end
end
