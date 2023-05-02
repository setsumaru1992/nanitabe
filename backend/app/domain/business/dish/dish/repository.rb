module Business::Dish::Dish
  class Repository < ::Business::Base::Repository
    class << self
      def find(id)
        dish_record = ::Dish.find(id)
        return if dish_record.blank?

        build_values_object_with_existing_object(dish_record, Dish, [:id, :user_id, :name, :meal_position, :comment])
      end

      def add(dish)
        new_dish_record = set_same_name_fields(dish, ::Dish.new, [:user_id, :name, :meal_position, :comment])
        new_dish_record.save!

        dish.id = new_dish_record.id
        dish
      end

      def update(updated_dish, update_user_id, force_update: false)
        existing_dish_record = ::Dish.find(updated_dish.id)

        can_update = existing_dish_record.user_id == update_user_id || force_update
        raise "このユーザはこのレコードを更新できません。" unless can_update

        dish_record_for_update = set_same_name_fields(updated_dish, existing_dish_record, [:name, :meal_position, :comment])
        dish_record_for_update.save!
      end

      def remove(dish_id, update_user_id, force_remove: false)
        existing_dish_record = ::Dish.find(dish_id)

        is_removable_user = existing_dish_record.user_id == update_user_id || force_remove
        raise "このユーザはこのレコードを削除できません。" unless is_removable_user

        # ユースケースがはっきり定まっていないので、定まるまで安全に倒す
        raise "この料理は登録されている食事があるので削除できません。" if existing_dish_record.meals.present?

        existing_dish_record.destroy!
      end
    end
  end
end
