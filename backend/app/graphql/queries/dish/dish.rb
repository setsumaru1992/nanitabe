module Queries::Dish
  class SpecifiedDish < ::Types::BaseObject
    implements ::Types::Output::Dish::DishFields
  end

  class Dish < ::Queries::BaseQuery
    # 通信で他の人の料理のIDも晒しちゃうから、idはランダム文字列にしたほうがいいのか？
    argument :id, Int, required: true

    type SpecifiedDish, null: false

    def resolve(id:)
      ::Dish
        .where(id:, user_id: context[:current_user_id])
        .eager_load(:dish_source_relation)
        .eager_load(:dish_tags).map do |dish|
          result_dish = dish.attributes
          result_dish["dish_source_relation"] = dish.dish_source_relation
          result_dish["tags"] = dish.dish_tags
          result_dish
        end
        .first
    end
  end
end
