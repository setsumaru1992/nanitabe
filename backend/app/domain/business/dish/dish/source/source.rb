module Business::Dish::Dish::Source
  class Source < ::Business::Base::Entity
    attribute :id, :integer

    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :name, :string
    validates :name, presence: true

    attribute :type, :integer
    validates :type, presence: true

    attribute :comment, :string
  end
end
