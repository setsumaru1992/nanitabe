module Business::Dish::Meal
  class Command::RemoveMealCommand < ::Business::Base::Command
    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :meal_id, :integer
    validates :meal_id, presence: true

    def call
      Repository.remove(meal_id, user_id)
    end
  end
end
