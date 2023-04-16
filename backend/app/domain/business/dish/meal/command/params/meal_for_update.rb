module Business::Dish::Meal
  class Command::Params::MealForUpdate < ::Business::Base::CommandParams
    attribute :id, :integer
    validates :id, presence: true

    attribute :date, :date

    attribute :dish_id, :integer

    attribute :meal_type, :integer

    attribute :comment, :string
  end
end
