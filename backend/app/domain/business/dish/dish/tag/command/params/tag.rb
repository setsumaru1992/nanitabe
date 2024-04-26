module Business::Dish::Dish::Tag
  class Command::Params::Tag < ::Business::Base::CommandParams
    attribute :id, :integer

    attribute :content, :string
    validates :content, presence: true
  end
end
