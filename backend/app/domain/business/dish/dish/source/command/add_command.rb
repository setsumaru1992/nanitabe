module Business::Dish::Dish::Source
  class Command::AddCommand < ::Business::Base::Command
    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :dish_source_for_create, :command_params
    validates :dish_source_for_create, presence: true

    def call
      source = Source.new(
        user_id:,
        name: dish_source_for_create.name,
        type: dish_source_for_create.type,
        comment: dish_source_for_create.comment,
      )
      Repository.add(source)
    end
  end
end
