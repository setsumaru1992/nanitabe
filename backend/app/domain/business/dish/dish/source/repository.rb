module Business::Dish::Dish::Source
  class Repository < ::Business::Base::Repository
    class << self
      def add(source)
        new_dish_source_record = set_same_name_fields(source, ::DishSource.new, [:user_id, :name, :type, :comment])
        new_dish_source_record.save!

        source.id = new_dish_source_record.id
        source
      end
    end
  end
end
