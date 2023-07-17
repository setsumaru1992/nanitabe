module Business::Dish::Dish::Evaluation
  class Repository < ::Business::Base::Repository
    class << self
      def find(id)
        dish_evaluation_record = ::DishEvaluation.find(id)
        return if dish_evaluation_record.blank?

        build_values_object_with_existing_object(dish_evaluation_record, Evaluation, [:id, :user_id, :dish_id, :score])
      end

      def add(evaluation)
        new_dish_evaluation_record = set_same_name_fields(evaluation, ::DishEvaluation.new, [:user_id, :dish_id, :score])
        new_dish_evaluation_record.save!

        evaluation.id = new_dish_evaluation_record.id
        evaluation
      end

      def update(updated_dish_evaluation, update_user_id, force_update: false)
        existing_dish_evaluation_record = ::DishEvaluation.find(updated_dish_evaluation.id)

        can_update = existing_dish_evaluation_record.user_id == update_user_id || force_update
        raise "このユーザはこのレコードを更新できません。" unless can_update

        dish_evaluation_record_for_update = set_same_name_fields(updated_dish_evaluation, existing_dish_evaluation_record, [:score])
        dish_evaluation_record_for_update.save!
      end
    end
  end
end
