# frozen_string_literal: true

require "rails_helper"
require_relative "./repository_add_shared_examples"

module Business::Dish::Dish::Source
  RSpec.describe Repository do
    describe ".add" do
      before do
        comparer.build_records_for_test()

        user_record = comparer.prepared_records[:user_record]
        @dish_source = Source.new(user_id: user_record.id, **comparer.values)
      end

      context "when add dish source with required fields," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_CREATED] }

        it "adding succeeds" do
          described_class.add(@dish_source)

          comparer.compare_to_expectation(self)
        end
      end

      context "when add dish source with ful fields," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_CREATED_WITH_FULL_VALUES] }

        it "adding succeeds" do
          described_class.add(@dish_source)

          comparer.compare_to_expectation(self)
        end
      end
    end
  end
end
