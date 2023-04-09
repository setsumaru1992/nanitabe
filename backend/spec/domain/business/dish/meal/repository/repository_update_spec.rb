# frozen_string_literal: true

require "rails_helper"
require_relative "./repository_update_shared_examples"

module Bussiness::Dish::Meal
  RSpec.describe Repository do
    describe ".update" do
      before do
        comparer.build_records_for_test()

        @updated_meal = Repository.find(comparer.prepared_records[:meal_record].id)
        @updated_meal.assign_attributes(**comparer.values)
      end

      context "when update meal with one meal field," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_UPDATED] }

        it "updating succeeds" do
          described_class.update(@updated_meal)

          comparer.compare_to_expectation(
            self,
            **specified_field_values_of_object(comparer.prepared_records[:meal_record], [:date, :comment]),
          )
        end
      end

      xcontext "when update meal with different dish," do
      end

      xcontext "when update meal with full fields," do
      end
    end
  end
end
