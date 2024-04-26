# frozen_string_literal: true

require "rails_helper"
require_relative "./repository_remove_shared_examples"

module Business::Dish::Dish::Tag
  RSpec.describe Repository do
    describe ".remove" do
      before do
        comparer.build_records_for_test()
      end

      context "when remove dish tag," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_TAG_SHOULD_BE_REMOVED] }

        it "removing succeeds" do
          described_class.remove(
            comparer.prepared_records[:dish_tag_record].id,
          )

          comparer.compare_to_expectation(self)
        end
      end
    end
  end
end
