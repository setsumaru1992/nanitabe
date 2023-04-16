module Business::Dish::Meal
  class Command::UpdateMealCommand < ::Business::Base::Command
    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :meal_for_update, :command_params
    validates :meal_for_update, presence: true

    def call
      meal = Repository.find(meal_for_update.id)

      update_fields = extract_present_fields(
        meal_for_update.attributes, ignore_fields: [:id]
      )
      meal.assign_attributes(update_fields)

      Repository.update(meal, user_id)
      meal
    end
  end
end
