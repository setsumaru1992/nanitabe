module Business::Dish::Dish::Source
  class Command::Params::SourceForCreate < ::Business::Base::CommandParams
    attribute :name, :string
    validates :name, presence: true

    attribute :type, :integer
    validates :type, presence: true

    attribute :comment, :string
  end
end
