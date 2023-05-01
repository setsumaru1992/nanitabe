module Business::Dish::Dish
  class Command::Params::DishForUpdate < ::Business::Base::CommandParams
    attribute :id, :integer
    validates :id, presence: true

    attribute :name, :string

    attribute :meal_position, :integer

    attribute :comment, :string
  end
end
