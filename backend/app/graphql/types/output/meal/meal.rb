# EssentialMealのエイリアス。
# 継承やクライアントでフラグメントとして使うときに、EssentialMealと書かせるのは内輪の事情を漏れ出しすぎなので、
# 一般的な命名でラッピング。
#
# EssentialMealを利用しているように、至極一般的なフィールドしか返却しない。
# 軽量版Mealや特定のユースケースのためのMealを使いたいときはEssentialMealを拡張せず、別のMealを作成する
module Types::Output::Meal
  module Meal
    include EssentialMeal
  end
end
