module Business::Dish::Dish::Evaluation
  class Evaluation < ::Business::Base::Entity
    attribute :id, :integer

    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :dish_id, :integer
    validates :dish_id, presence: true

    attribute :score, :float
    validates :score, presence: true, acceptance: { accept: 1.step(5, 0.5).map(&:to_f) }
  end
end
