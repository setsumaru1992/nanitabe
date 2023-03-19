# frozen_string_literal: true

require "rails_helper"
require_relative "./repository_add_shared_examples"

module Bussiness::Dish
  RSpec.describe Repository do
    describe ".add" do
      let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED] }
      before do
        comparer.build_records_for_test()

        user_record = comparer.prepared_records[:user_record]
        @dish = Dish.new(user_id: user_record.id, **comparer.values)
      end

      context "when add dish with required values," do
        it "adding succeeds" do
          dish = described_class.add(@dish)

          comparer.compare_to_expectation(self, id: dish.id)
        end
      end
    end
  end
end
