module Queries::Dish::Source
  class DishSourceRegisteredWithDish < ::Types::BaseObject
    implements ::Types::Output::Dish::Source::DishSourceFields
  end

  class DishSources < ::Queries::BaseQuery
    type [DishSourceRegisteredWithDish, { null: false }], null: false

    def resolve
      # 大きくなったらfinder化
      ::DishSource.where(user_id: context[:current_user_id])
    end
  end
end
