# frozen_string_literal: true

require "rails_helper"
require_relative "./swap_meals_between_days_command_shared_examples"

module Business::Dish::Meal
  RSpec.describe Command::SwapMealsBetweenDaysCommand do
    describe ".call" do
      before do
        comparer.build_records_for_test()
      end

      xcontext "when swap between day with multi meals and day with multi meals, " do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_SWAP_FROM_DAY_WITH_MEALS_TO_DAY_WITH_MEALS] }

        it "swapping succeeds" do
          described_class.call(
            user_id: comparer.prepared_records[:user_record].id,
            from_date: comparer.values[:from_date],
            to_date: comparer.values[:to_date],
            )

          comparer.compare_to_expectation(self)
        end
      end

      context "when swap between day with meal and day without meal, " do

      end

      context "when swap between day without meal and day with meal, " do

      end

      context "when swap between day without meal and day without meal, " do

      end
    end
  end
end