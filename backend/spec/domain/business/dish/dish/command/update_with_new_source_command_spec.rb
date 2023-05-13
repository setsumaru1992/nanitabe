# frozen_string_literal: true

require "rails_helper"
require_relative "../repository/repository_update_shared_examples"
require_relative "../repository/repository_put_dish_relation_shared_examples"
require_relative "../source/repository/repository_add_shared_examples"
require_relative "../repository/repository_remove_dish_relation_shared_examples"

module Business::Dish::Dish
  RSpec.describe Command::UpdateWithNewSourceCommand do
    describe ".call" do
      # UpdateCommandのテストとの差分、つまりUpdateWithNewSourceCommandゆえのテストを記載

      before do
        dish_comparer.build_records_for_test()
        dish_source_comparer.build_records_for_test()
        dish_source_relation_comparer.build_records_for_test()
      end

      context "when update dish with new source relation, " do
        let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_UPDATED] }
        let!(:dish_source_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_CREATED] }
        let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_SHOULD_BE_CREATED] }

        it "updating succeeds" do
          _, created_dish_source = described_class.call(
            user_id: dish_comparer.prepared_records[:user_record].id,
            dish_for_update: Command::Params::DishForUpdate.new(
              id: dish_comparer.prepared_records[:dish_record].id,
              name: dish_comparer.values[:name],
            ),
            dish_source_for_create: Source::Command::Params::SourceForCreate.new(
              name: dish_source_comparer.values[:name],
              type: dish_source_comparer.values[:type],
              comment: dish_source_comparer.values[:comment],
            ),
            dish_source_relation_detail_value: dish_source_relation_comparer.values[:recipe_book_page],
          )

          dish_comparer.compare_to_expectation(
            self,
            **specified_field_values_of_object(dish_comparer.prepared_records[:dish_record], [:meal_position, :comment]),
          )
          dish_source_comparer.compare_to_expectation(self)
          dish_source_relation_comparer.compare_to_expectation(
            self,
            dish_source_id: created_dish_source.id,
          )
        end
      end
    end
  end
end
