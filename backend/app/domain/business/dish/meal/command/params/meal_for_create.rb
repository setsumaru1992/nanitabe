module Business::Dish::Meal
  class Command::Params::MealForCreate < ::Business::Base::CommandParams

    attribute :date, :date
    validates :date, presence: true

    attribute :meal_type, :integer
    validates :meal_type, presence: true

    attribute :comment, :string
  end
end
