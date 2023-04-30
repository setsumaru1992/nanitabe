# frozen_string_literal: true

require "rails_helper"
require_relative "../repository/repository_remove_shared_examples"

module Business::Dish::Meal
  RSpec.describe Command::RemoveMealCommand do
    describe ".call" do
      before do
        comparer.build_records_for_test()
      end

      context "when remove meal, " do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_REMOVED] }

        it "removing succeeds" do
          described_class.call(
            user_id: comparer.prepared_records[:user_record].id,
            meal_id: comparer.prepared_records[:meal_record].id,
          )

          comparer.compare_to_expectation(self)
        end
      end
    end
  end
end
