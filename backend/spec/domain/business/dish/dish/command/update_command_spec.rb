# frozen_string_literal: true

require "rails_helper"
require_relative "../repository/repository_update_shared_examples"

module Business::Dish::Dish
  RSpec.describe Command::UpdateCommand do
    describe ".call" do
      before do
        comparer.build_records_for_test()
      end

      context "when update dish with one params, " do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_UPDATED] }

        it "updating succeeds" do
          described_class.call(
            user_id: comparer.prepared_records[:user_record].id,
            dish_for_update: Command::Params::DishForUpdate.new(
              id: comparer.prepared_records[:dish_record].id,
              name: comparer.values[:name],
            ),
          )

          comparer.compare_to_expectation(
            self,
            **specified_field_values_of_object(comparer.prepared_records[:dish_record], [:meal_position, :comment]),
          )
        end
      end

      context "when update dish with full params, " do
        let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_UPDATED_WITH_FULL_FIELD] }

        it "updating succeeds" do
          described_class.call(
            user_id: comparer.prepared_records[:user_record].id,
            dish_for_update: Command::Params::DishForUpdate.new(
              id: comparer.prepared_records[:dish_record].id,
              name: comparer.values[:name],
              meal_position: comparer.values[:meal_position],
              comment: comparer.values[:comment],
            ),
          )

          comparer.compare_to_expectation(self)
        end
      end
    end
  end
end
