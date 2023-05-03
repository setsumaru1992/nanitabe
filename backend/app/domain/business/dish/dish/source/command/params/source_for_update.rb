module Business::Dish::Dish::Source
  class Command::Params::SourceForUpdate < ::Business::Base::CommandParams
    attribute :id, :integer
    validates :id, presence: true

    attribute :name, :string

    attribute :type, :integer

    attribute :comment, :string
  end
end
