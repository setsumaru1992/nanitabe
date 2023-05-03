# frozen_string_literal: true

require "rails_helper"
require_relative "./repository_update_shared_examples"

module Business::Dish::Dish::Source
  RSpec.describe Repository do
    describe ".update" do
      before do
        comparer.build_records_for_test()

        @updated_dish_source = Repository.find(
          comparer.prepared_records[:dish_source_record].id,
        )
        @updated_dish_source.assign_attributes(**comparer.values)
      end

      context "when update dish source with one dish field," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_UPDATED] }

        it "updating succeeds" do
          described_class.update(@updated_dish_source, comparer.prepared_records[:user_record].id)

          comparer.compare_to_expectation(
            self,
            **specified_field_values_of_object(comparer.prepared_records[:dish_source_record], [:type, :comment]),
          )
        end
      end

      context "when update dish source with full dish field," do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_UPDATED_WITH_FULL_VALUES] }

        it "updating succeeds" do
          described_class.update(@updated_dish_source, comparer.prepared_records[:user_record].id)

          comparer.compare_to_expectation(self)
        end
      end
    end
  end
end
