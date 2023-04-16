# frozen_string_literal: true

require "rails_helper"
require_relative "../repository/repository_update_shared_examples"

module Business::Dish::Meal
  RSpec.describe Command::UpdateMealCommand do
    describe ".call" do
      before do
        comparer.build_records_for_test()
      end

      context "when update meal with one params, " do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_UPDATED] }

        it "updating succeeds" do
          described_class.call(
            user_id: comparer.prepared_records[:user_record].id,
            meal_for_update: Command::Params::MealForUpdate.new(
              id: comparer.prepared_records[:meal_record].id,
              meal_type: comparer.values[:meal_type],
              dish_id: comparer.prepared_records[:dish_record].id,
            ),
          )

          comparer.compare_to_expectation(
            self,
            **specified_field_values_of_object(comparer.prepared_records[:meal_record], [:date, :comment]),
          )
        end
      end

      context "when update meal with full params, " do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_UPDATED_WITH_FULL_FIELD] }

        it "updating succeeds" do
          described_class.call(
            user_id: comparer.prepared_records[:user_record].id,
            meal_for_update: Command::Params::MealForUpdate.new(
              id: comparer.prepared_records[:meal_record].id,
              date: comparer.values[:date],
              meal_type: comparer.values[:meal_type],
              comment: comparer.values[:comment],
              dish_id: comparer.values[:dish_id],
            ),
          )

          comparer.compare_to_expectation(self)
        end
      end
    end
  end
end
