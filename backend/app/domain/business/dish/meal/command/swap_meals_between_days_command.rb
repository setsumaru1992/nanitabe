module Business::Dish::Meal
  class Command::SwapMealsBetweenDaysCommand < ::Business::Base::Command
    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :from_date, :date
    validates :from_date, presence: true

    attribute :to_date, :date
    validates :to_date, presence: true

    def call

    end

  end
end