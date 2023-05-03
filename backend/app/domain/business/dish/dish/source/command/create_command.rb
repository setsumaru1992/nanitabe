module Business::Dish::Dish::Source
  class Command::CreateCommand < ::Business::Base::Command
    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :source_for_create, :command_params
    validates :source_for_create, presence: true

    def call
      source = Source.new(
        user_id:,
        name: source_for_create.name,
        type: source_for_create.type,
        comment: source_for_create.comment,
      )
      Repository.add(source)
    end
  end
end
