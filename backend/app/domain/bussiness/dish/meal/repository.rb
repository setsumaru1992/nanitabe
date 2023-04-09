module Bussiness::Dish::Meal
  class Repository < ::Bussiness::Base::Repository
    class << self
      def find(id)
        meal_record = ::Meal.find(id)
        return if meal_record.blank?

        build_values_object_with_existing_object(meal_record, Meal, [:id, :user_id, :dish_id, :date, :meal_type, :comment])
      end

      def add(meal)
        new_meal_record = set_same_name_fields(meal, ::Meal.new, [:user_id, :dish_id, :date, :meal_type, :comment])
        new_meal_record.save!

        meal.id = new_meal_record.id
        meal
      end

      def update(updated_meal, update_user_id, force_update: false)
        existing_meal_record = ::Meal.find(updated_meal.id)

        can_update = existing_meal_record.user_id == update_user_id || force_update
        raise "このユーザはこのレコードを更新できません。" unless can_update

        meal_record_for_update = set_same_name_fields(updated_meal, existing_meal_record, [:dish_id, :date, :meal_type, :comment])
        meal_record_for_update.save!
      end
    end
  end
end
