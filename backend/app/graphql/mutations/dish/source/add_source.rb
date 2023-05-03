module Mutations::Dish::Source
  class AddSource < ::Mutations::BaseMutation
    argument :dish_source, ::Types::Input::Dish::Source::SourceForCreate, required: true

    field :dish_source_id, Int, null: false

    def resolve(dish_source:)
      ActiveRecord::Base.transaction do
        created_dish_source = ::Business::Dish::Dish::Source::Command::CreateCommand.call(
          user_id: context[:current_user_id],
          source_for_create: ::Business::Dish::Dish::Source::Command::Params::SourceForCreate.new(
            name: dish_source.name,
            type: dish_source.type,
            comment: dish_source.comment,
          ),
        )

        {
          dish_source_id: created_dish_source.id,
        }
      end
    end
  end
end
