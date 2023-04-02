# EssentialDishのエイリアス。
# 継承やクライアントでフラグメントとして使うときに、EssentialDishと書かせるのは内輪の事情を漏れ出しすぎなので、
# 一般的な命名でラッピング。
#
# EssentialDishを利用しているように、至極一般的なフィールドしか返却しない。
# 軽量版Dishや特定のユースケースのためのDishを使いたいときはEssentialDishを拡張せず、別のDishを作成する
module Types::Output::Dish
  module Dish
    include EssentialDish
  end
end
