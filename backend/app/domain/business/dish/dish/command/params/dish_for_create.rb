module Business::Dish::Dish
  class Command::Params::DishForCreate < ::Business::Base::CommandParams
    attribute :name, :string
    validates :name, presence: true

    attribute :meal_position, :integer
    validates :meal_position, presence: true

    attribute :comment, :string
  end
end
