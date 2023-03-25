# frozen_string_literal: true

require "rails_helper"
require_relative "./repository_add_shared_examples"

module Bussiness::Dish::Dish
  RSpec.describe Repository do
    describe ".add" do
      before do
        comparer.build_records_for_test()

        user_record = comparer.prepared_records[:user_record]
        @dish = Dish.new(user_id: user_record.id, **comparer.values)
      end

      context "when add dish with required fields," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED] }

        it "adding succeeds" do
          described_class.add(@dish)

          comparer.compare_to_expectation(self)
        end
      end

      context "when add dish with full fields," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED_WITH_FULL_VALUES] }

        it "adding succeeds" do
          described_class.add(@dish)

          comparer.compare_to_expectation(self)
        end
      end
    end
  end
end
