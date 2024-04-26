# frozen_string_literal: true

require "rails_helper"
require_relative "../repository/repository_add_shared_examples"
require_relative "../repository/repository_put_dish_relation_shared_examples"
require_relative "../tag/repository/repository_add_shared_examples"

module Business::Dish::Dish
  RSpec.describe Command::AddCommand do
    describe ".call" do
      before do
        dish_comparer.build_records_for_test()
        dish_source_relation_comparer.build_records_for_test()
      end

      context "when create dish with essential params, " do
        let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED] }
        let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_HAS_NO_UPDATE] }

        it "adding succeeds" do
          described_class.call(
            user_id: dish_comparer.prepared_records[:user_record].id,
            dish_for_create: Command::Params::DishForCreate.new(
              name: dish_comparer.values[:name],
              meal_position: dish_comparer.values[:meal_position],
              comment: dish_comparer.values[:comment],
            ),
          )

          dish_comparer.compare_to_expectation(self)
          dish_source_relation_comparer.compare_to_expectation(self)
        end
      end

      context "when create dish with full params, " do
        let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED_WITH_FULL_VALUES] }
        let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_HAS_NO_UPDATE] }

        it "adding succeeds" do
          described_class.call(
            user_id: dish_comparer.prepared_records[:user_record].id,
            dish_for_create: Command::Params::DishForCreate.new(
              name: dish_comparer.values[:name],
              meal_position: dish_comparer.values[:meal_position],
              comment: dish_comparer.values[:comment],
            ),
          )

          dish_comparer.compare_to_expectation(self)
          dish_source_relation_comparer.compare_to_expectation(self)
        end
      end

      context "when create dish with source relation param, " do
        let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED] }
        let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_SHOULD_BE_CREATED] }

        it "adding succeeds" do
          created_dish = described_class.call(
            user_id: dish_comparer.prepared_records[:user_record].id,
            dish_for_create: Command::Params::DishForCreate.new(
              name: dish_comparer.values[:name],
              meal_position: dish_comparer.values[:meal_position],
              comment: dish_comparer.values[:comment],
            ),
            dish_source_for_read: Source::Command::Params::SourceForRead.new(
              id: dish_source_relation_comparer.prepared_records[:dish_source_record].id,
              type: dish_source_relation_comparer.prepared_records[:dish_source_record].type,
            ),
            dish_source_relation_detail: Command::Params::DishSourceRelation.build_relation_detail(
              dish_source_relation_comparer.prepared_records[:dish_source_record].type,
              dish_source_relation_comparer.values[:recipe_book_page],
            ),
          )

          dish_comparer.compare_to_expectation(self)
          dish_source_relation_comparer.compare_to_expectation(self, dish_id: created_dish.id)
        end
      end

      context "when create dish with tag param" do
        let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED] }
        let!(:dish_tag_comparer) { COMPARERS[KEY_OF_TEST_DISH_TAG_SHOULD_BE_CREATED] }
        let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_HAS_NO_UPDATE] }

        it "adding succeeds" do
          dish_tag_comparer.build_records_for_test()

          created_dish = described_class.call(
            user_id: dish_comparer.prepared_records[:user_record].id,
            dish_for_create: Command::Params::DishForCreate.new(
              name: dish_comparer.values[:name],
              meal_position: dish_comparer.values[:meal_position],
              comment: dish_comparer.values[:comment],
            ),
            dish_tags: [
              ::Business::Dish::Dish::Tag::Command::Params::Tag.new(
                content: dish_tag_comparer.values[:content],
              ),
            ],
          )

          dish_comparer.compare_to_expectation(self)
          dish_tag_comparer.compare_to_expectation(self, dish_id: created_dish.id)
        end
      end
    end
  end
end
