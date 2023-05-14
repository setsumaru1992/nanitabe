module Queries::Dish::Source
  class SpecifiedDishSource < ::Types::BaseObject
    implements ::Types::Output::Dish::Source::DishSourceFields
  end

  class DishSource < ::Queries::BaseQuery
    argument :id, Int, required: true

    type SpecifiedDishSource, null: false

    def resolve(id:)
      # 大きくなったらfinder化
      ::DishSource.where(id:, user_id: context[:current_user_id]).first
    end
  end
end
