# frozen_string_literal: true

require "rails_helper"
require_relative "../repository/repository_add_shared_examples"

module Business::Dish::Dish::Source
  RSpec.describe Command::CreateCommand do
    describe ".call" do
      before do
        comparer.build_records_for_test()
      end

      context "when create source with essential params, " do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_CREATED] }

        it "adding succeeds" do
          described_class.call(
            user_id: comparer.prepared_records[:user_record].id,
            dish_source_for_create: Command::Params::SourceForCreate.new(
              name: comparer.values[:name],
              type: comparer.values[:type],
              comment: comparer.values[:comment],
            ),
          )

          comparer.compare_to_expectation(self)
        end
      end

      context "when create source with full params, " do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_CREATED_WITH_FULL_VALUES] }

        it "adding succeeds" do
          described_class.call(
            user_id: comparer.prepared_records[:user_record].id,
            dish_source_for_create: Command::Params::SourceForCreate.new(
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
