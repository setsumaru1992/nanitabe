# frozen_string_literal: true

require "rails_helper"
require_relative "./repository_update_shared_examples"

module Business::Dish::Dish
  RSpec.describe Repository do
    describe ".update" do
      before do
        comparer.build_records_for_test()

        @updated_dish = Repository.find(
          comparer.prepared_records[:dish_record].id,
        )
        @updated_dish.assign_attributes(**comparer.values)
      end

      context "when update dish with one dish field," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_UPDATED] }

        it "updating succeeds" do
          described_class.update(@updated_dish, comparer.prepared_records[:user_record].id)

          comparer.compare_to_expectation(
            self,
            **specified_field_values_of_object(comparer.prepared_records[:dish_record], [:meal_position, :comment]),
          )
        end
      end

      context "when update meal with full dish field," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_UPDATED_WITH_FULL_FIELD] }

        it "updating succeeds" do
          described_class.update(@updated_dish, comparer.prepared_records[:user_record].id)

          comparer.compare_to_expectation(self)
        end
      end
    end
  end
end
