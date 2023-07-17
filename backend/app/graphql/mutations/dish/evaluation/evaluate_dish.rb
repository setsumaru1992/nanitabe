module Mutations::Dish::Evaluation
  class EvaluateDish < ::Mutations::BaseMutation
    argument :dish_id, Int, required: true
    argument :score, Float, required: true

    field :dish_id, Int, null: false

    def resolve(dish_id:, score:)
      ::Business::Dish::Dish::Evaluation::Command::EvaluateCommand.call(
        user_id: context[:current_user_id],
        dish_id:,
        score:,
      )
    end
  end
end
