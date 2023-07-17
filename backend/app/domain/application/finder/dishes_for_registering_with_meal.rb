module Application::Finder
  class DishesForRegisteringWithMeal < Business::Base::Finder
    attribute :access_user_id, :integer
    validates :access_user_id, presence: true

    attribute :search_string, :string
    attribute :meal_position, :integer
    attribute :registered_with_meal, :boolean

    attribute :dish_id_registered_with_meal, :integer

    def fetch
      # 追加したい取得ロジック
      # - order
      #   - (将来)自己評価（低いものを後ろの並び順に追いやる）
      #   - mealへの利用回数 降順
      #   - mealでの登録日時かdishでの登録日時の早い方 降順
      # - 絞り込み(検索フォーム実装後)
      #   - dishの名前
      #   - or レシピ元の名前
      #   - or (将来)カテゴリ名
      # - (数が多くなってきたら)20個くらいしか出さずに、続きはGraphQLのページング機能で出す
      registered_dish_with_meal = nil
      if dish_id_registered_with_meal.present?
        registered_dish_with_meal = ::Dish.where(id: dish_id_registered_with_meal)
        registered_dish_with_meal = add_join_to_relation(registered_dish_with_meal)
        registered_dish_with_meal = add_output_fields_to_relation(registered_dish_with_meal)
        registered_dish_with_meal = registered_dish_with_meal.first
      end

      dish_relation = add_auth_filter_to_relation(::Dish.all)

      dish_relation = add_join_to_relation(dish_relation)

      dish_relation = add_filter_to_relation(dish_relation, ignore_dish_id: registered_dish_with_meal&.id)
      dish_relation = add_output_fields_to_relation(dish_relation)
      dish_relation = add_order_to_relation(dish_relation)
      [registered_dish_with_meal, dish_relation].flatten.compact
    end

    def add_join_to_relation(dish_relation)
      dish_relation.left_outer_joins(:meals).eager_load(:dish_source).left_outer_joins(:dish_evaluation)
    end

    def add_auth_filter_to_relation(dish_relation)
      dish_relation.where(user_id: access_user_id)
    end

    def add_filter_to_relation(dish_relation, ignore_dish_id: nil)
      if search_string.present?
        dish_relation = dish_relation
                        .where("dishes.name LIKE ?", "%#{search_string}%")
                        .or(::DishSource.where("dish_sources.name LIKE ?", "%#{search_string}%"))
      end

      if meal_position.present?
        dish_relation = dish_relation.where(meal_position: meal_position)
      end

      if !registered_with_meal.nil?
        if registered_with_meal
          dish_relation = dish_relation.having("COUNT(meals.id) > 0")
        else
          dish_relation = dish_relation.having("COUNT(meals.id) = 0")
        end
      end

      if ignore_dish_id.present?
        dish_relation = dish_relation.where.not(id: ignore_dish_id)
      end
      dish_relation
    end

    def add_output_fields_to_relation(dish_relation)
      dish_relation.select("
        dishes.*
        , dish_sources.name AS dish_source_name
        , COALESCE(dish_evaluations.score, 3.0) AS dish_evaluation
      ")
    end

    def add_order_to_relation(dish_relation)
      dish_relation.group("dishes.id").order("dish_evaluation DESC, COUNT(meals.id) DESC, MAX(dishes.created_at) DESC")
    end
  end
end
