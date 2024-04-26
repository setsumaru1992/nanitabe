module Business::Dish::Dish::Tag
  class Repository < ::Business::Base::Repository
    class << self
      def fetch_tags_of_dish(dish_id)
        existing_tag_records = ::DishTag.where(dish_id:)
        existing_tag_records.map do |existing_tag_record|
          set_same_name_fields(existing_tag_record, DishTag.new, [:id, :user_id, :dish_id, :content])
        end
      end

      def add(tag)
        new_dish_tag_record = set_same_name_fields(tag, ::DishTag.new, [:user_id, :dish_id, :content])
        new_dish_tag_record.save!
        tag
      end

      def remove(dish_tag_id, force_remove: false)
        existing_dish_tag_record = ::DishTag.find(dish_tag_id)
        existing_dish_tag_record.destroy!
      end
    end
  end
end
