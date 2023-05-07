module Queries::Dish
  class SpecifiedDish < ::Types::BaseObject
    implements ::Types::Output::Dish::DishFields
  end

  class Dish < ::Queries::BaseQuery
    # 通信で他の人の料理のIDも晒しちゃうから、idはランダム文字列にしたほうがいいのか？
    argument :id, Int, required: true

    type SpecifiedDish, null: false

    def resolve(id:)
      ::Dish.where(id:, user_id: context[:current_user_id]).eager_load(:dish_source_relation).first
    end
  end
end
