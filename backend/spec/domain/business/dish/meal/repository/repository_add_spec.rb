# frozen_string_literal: true

require "rails_helper"
require_relative "./repository_add_shared_examples"

module Bussiness::Dish::Meal
  RSpec.describe Repository do
    describe ".add" do
      before do
        comparer.build_records_for_test()

        @meal = Meal.new(
          user_id: comparer.prepared_records[:user_record].id,
          dish_id: comparer.prepared_records[:dish_record].id,
          **comparer.values,
        )
      end

      context "when add meal with required fields," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_CREATED] }

        it "adding succeeds" do
          described_class.add(@meal)

          comparer.compare_to_expectation(self)
        end
      end

      context "when add meal with full fields," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_CREATED_WITH_FULL_FIELD] }

        it "adding succeeds" do
          described_class.add(@meal)

          comparer.compare_to_expectation(self)
        end
      end
    end
  end
end
