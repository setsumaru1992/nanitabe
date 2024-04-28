module Business::Dish::Dish::Tag
  class Tag < ::Business::Base::Entity
    attribute :id, :integer

    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :dish_id, :integer
    validates :dish_id, presence: true

    attribute :content, :string
    validates :content, presence: true

    attribute :normalized_content, :string
  end
end
