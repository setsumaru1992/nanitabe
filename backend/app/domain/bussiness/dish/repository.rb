module Bussiness::Dish
  class Repository < ::Bussiness::Base::Repository
    class << self
      def add(dish)
        new_dish_record = set_same_name_fields(dish, ::Dish.new, [:user_id, :name, :kana, :meal_position, :comment])
        new_dish_record.save!

        dish.id = new_dish_record.id
        dish
      end
    end
  end
end
