# frozen_string_literal: true

require "rails_helper"
require_relative "../repository/repository_update_shared_examples"

module Business::Dish::Dish::Source
  RSpec.describe Command::UpdateCommand do
    describe ".call" do
      before do
        comparer.build_records_for_test()
      end

      context "when update source with one params, " do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_UPDATED] }

        it "updating succeeds" do
          described_class.call(
            user_id: comparer.prepared_records[:user_record].id,
            dish_source_for_update: Command::Params::SourceForUpdate.new(
              id: comparer.prepared_records[:dish_source_record].id,
              name: comparer.values[:name],
            ),
          )

          comparer.compare_to_expectation(
            self,
            **specified_field_values_of_object(comparer.prepared_records[:dish_source_record], [:type, :comment]),
          )
        end
      end

      context "when update source with full params, " do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_UPDATED_WITH_FULL_VALUES] }

        it "updating succeeds" do
          described_class.call(
            user_id: comparer.prepared_records[:user_record].id,
            dish_source_for_update: Command::Params::SourceForUpdate.new(
              id: comparer.prepared_records[:dish_source_record].id,
              name: comparer.values[:name],
              type: comparer.values[:type],
              comment: comparer.values[:comment],
            ),
          )

          comparer.compare_to_expectation(self)
        end
      end
    end
  end
end
