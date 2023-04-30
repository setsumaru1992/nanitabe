# frozen_string_literal: true

require "rails_helper"
require_relative "./repository_remove_shared_examples"

module Business::Dish::Meal
  RSpec.describe Repository do
    describe ".remove" do
      before do
        comparer.build_records_for_test()
      end

      context "when remove meal," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_REMOVED] }

        it "removing succeeds" do
          described_class.remove(
            comparer.prepared_records[:meal_record].id,
            comparer.prepared_records[:user_record].id,
          )

          comparer.compare_to_expectation(self)
        end
      end

      context "when remove meal by different user," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_REMOVED] }

        it "removing succeeds" do
          expect { described_class.remove(comparer.prepared_records[:meal_record].id, 99) }.to raise_error "このユーザはこのレコードを削除できません。"
        end
      end
    end
  end
end
