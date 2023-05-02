# frozen_string_literal: true

require "rails_helper"
require_relative "./repository_remove_shared_examples"

module Business::Dish::Dish
  RSpec.describe Repository do
    describe ".remove" do
      before do
        comparer.build_records_for_test()
      end

      context "when remove dish," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_REMOVED] }

        it "removing succeeds" do
          described_class.remove(
            comparer.prepared_records[:dish_record].id,
            comparer.prepared_records[:user_record].id,
          )

          comparer.compare_to_expectation(self)
        end
      end

      context "when remove dish by different user," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_REMOVED] }

        it "removing fails" do
          expect { described_class.remove(comparer.prepared_records[:dish_record].id, 99) }.to raise_error "このユーザはこのレコードを削除できません。"
        end
      end

      context "when remove dish having meal," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_HAVING_MEAL_SHOULD_NOT_BE_REMOVED] }

        it "removing fails" do
          expect do
            described_class.remove(
              comparer.prepared_records[:dish_record].id,
              comparer.prepared_records[:user_record].id,
            )
          end.to raise_error "この料理は登録されている食事があるので削除できません。"
          comparer.compare_to_expectation(self)
        end
      end
    end
  end
end
