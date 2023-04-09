# frozen_string_literal: true

require "rails_helper"
require_relative "./repository_update_shared_examples"

module Bussiness::Dish::Meal
  RSpec.describe Repository do
    describe ".update" do
      before do
        comparer.build_records_for_test()

        @updated_meal = Repository.find(
          comparer.prepared_records[:meal_record].id,
        )
        @updated_meal.assign_attributes(**comparer.values)
      end

      context "when update meal with one meal field," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_UPDATED] }

        it "updating succeeds" do
          described_class.update(@updated_meal, comparer.prepared_records[:user_record].id)

          comparer.compare_to_expectation(
            self,
            **specified_field_values_of_object(comparer.prepared_records[:meal_record], [:date, :comment]),
          )
        end
      end

      context "when update meal by different user," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_UPDATED] }

        it "updating succeeds" do
          expect { described_class.update(@updated_meal, 99) }.to raise_error "このユーザはこのレコードを更新できません。"
        end
      end

      context "when update meal with different dish," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_UPDATED_WITH_DIFFERENT_DISH] }

        it "updating succeeds" do
          described_class.update(@updated_meal, comparer.prepared_records[:user_record].id)

          comparer.compare_to_expectation(
            self,
            **specified_field_values_of_object(comparer.prepared_records[:meal_record], [:meal_type, :date, :comment]),
          )
        end
      end

      context "when update meal with full fields," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_UPDATED_WITH_FULL_FIELD] }

        it "updating succeeds" do
          described_class.update(@updated_meal, comparer.prepared_records[:user_record].id)

          comparer.compare_to_expectation(self)
        end
      end
    end
  end
end
