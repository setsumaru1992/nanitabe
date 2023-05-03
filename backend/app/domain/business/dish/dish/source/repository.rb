module Business::Dish::Dish::Source
  class Repository < ::Business::Base::Repository
    class << self
      def find(id)
        dish_source_record = ::DishSource.find(id)
        return if dish_source_record.blank?

        build_values_object_with_existing_object(dish_source_record, Source, [:id, :user_id, :name, :type, :comment])
      end

      def add(source)
        new_dish_source_record = set_same_name_fields(source, ::DishSource.new, [:user_id, :name, :type, :comment])
        new_dish_source_record.save!

        source.id = new_dish_source_record.id
        source
      end

      def update(updated_dish_source, update_user_id, force_update: false)
        existing_dish_source_record = ::DishSource.find(updated_dish_source.id)

        can_update = existing_dish_source_record.user_id == update_user_id || force_update
        raise "このユーザはこのレコードを更新できません。" unless can_update

        dish_source_record_for_update = set_same_name_fields(updated_dish_source, existing_dish_source_record, [:name, :type, :comment])
        dish_source_record_for_update.save!
      end
    end
  end
end
