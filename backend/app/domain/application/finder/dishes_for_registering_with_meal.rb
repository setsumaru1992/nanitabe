module Application::Finder
  class DishesForRegisteringWithMeal < Business::Base::Finder
    attribute :access_user_id, :integer
    validates :access_user_id, presence: true

    attribute :search_string, :string

    def fetch
      # 追加したい取得ロジック
      # - order
      #   - (将来)自己評価（低いものを後半に追いやる）
      #   - mealへの利用回数 降順
      #   - mealでの登録日時かdishでの登録日時の早い方 降順
      # - 絞り込み(検索フォーム実装後)
      #   - dishの名前
      #   - or レシピ元の名前
      #   - or (将来)カテゴリ名
      # - (数が多くなってきたら)20個くらいしか出さずに、続きはGraphQLのページング機能で出す
      dishes = ::Dish.where(user_id: access_user_id)
      dishes = dishes.where("name LIKE '%?%'", search_string) if search_string.present?
      dishes
    end
  end
end
