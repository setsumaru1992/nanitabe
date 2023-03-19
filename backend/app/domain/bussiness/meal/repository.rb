module Bussiness::Meal
  class Repository < ::Bussiness::Base::Repository
    class << self
      def add(meal)
        new_meal_record = set_same_name_fields(meal, ::Meal.new, [:user_id, :dish_id, :date, :meal_type, :comment])
        new_meal_record.save!

        meal.id = new_meal_record.id
        meal
      end
    end
  end
end
