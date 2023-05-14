# frozen_string_literal: true

require "rails_helper"
require_relative "./repository_remove_dish_relation_shared_examples"

module Business::Dish::Dish
  RSpec.describe Repository do
    describe ".remove_dish_relation" do
      before do
        comparer.build_records_for_test()
      end

      context "when remove dish source relation," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_SHOULD_BE_REMOVED] }
        it "removing succeeds" do
          described_class.remove_dish_source_relation(
            comparer.prepared_records[:dish_record].id,
          )

          comparer.compare_to_expectation(self)
        end
      end
    end
  end
end
