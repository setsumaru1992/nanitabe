# frozen_string_literal: true

require "rails_helper"
require_relative "../repository/repository_add_shared_examples"

module Bussiness::Dish::Meal
  RSpec.describe Command::CreateMealCommand do
    describe ".call" do
      before do
        comparer.build_records_for_test()
      end

      context "when create dish with essential params, " do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_CREATED] }

        it "adding succeeds" do
          described_class.call(
            user_id: comparer.prepared_records[:user_record].id,
            dish_id: comparer.prepared_records[:dish_record].id,
            meal_for_create: Command::Params::MealForCreate.new(
              date: comparer.values[:date],
              meal_type: comparer.values[:meal_type],
              comment: comparer.values[:comment],
            )
          )

          comparer.compare_to_expectation(self)
        end
      end

      context "when create dish with full params, " do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_CREATED_WITH_FULL_FIELD] }

        it "adding succeeds" do
          described_class.call(
            user_id: comparer.prepared_records[:user_record].id,
            dish_id: comparer.prepared_records[:dish_record].id,
            meal_for_create: Command::Params::MealForCreate.new(
              date: comparer.values[:date],
              meal_type: comparer.values[:meal_type],
              comment: comparer.values[:comment],
            )
          )

          comparer.compare_to_expectation(self)
        end
      end
    end
  end
end