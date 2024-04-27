# frozen_string_literal: true

require "rails_helper"
require_relative "../repository/repository_update_shared_examples"
require_relative "../repository/repository_put_dish_relation_shared_examples"
require_relative "../repository/repository_remove_dish_relation_shared_examples"

module Business::Dish::Dish
  RSpec.describe Command::UpdateCommand do
    describe ".call" do
      before do
        dish_comparer.build_records_for_test()
        dish_source_relation_comparer.build_records_for_test()
      end

      context "when update dish with one params, " do
        let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_UPDATED] }
        let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_HAS_NO_UPDATE] }

        it "updating succeeds" do
          described_class.call(
            user_id: dish_comparer.prepared_records[:user_record].id,
            dish_for_update: Command::Params::DishForUpdate.new(
              id: dish_comparer.prepared_records[:dish_record].id,
              name: dish_comparer.values[:name],
            ),
            dish_source_relation: Command::Params::DishSourceRelation.build_relation(
              dish_source_relation_comparer.prepared_records[:dish_source_record].type,
              dish_source_relation_comparer.prepared_records[:dish_source_relation_record].dish_id,
              dish_source_relation_comparer.prepared_records[:dish_source_relation_record].dish_source_id,
              dish_source_relation_comparer.prepared_records[:dish_source_relation_record].recipe_book_page,
            ),
          )

          dish_comparer.compare_to_expectation(
            self,
            **specified_field_values_of_object(dish_comparer.prepared_records[:dish_record], [:meal_position, :comment]),
          )
          dish_source_relation_comparer.compare_to_expectation(self)
        end
      end

      context "when update dish with full params, " do
        let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_UPDATED_WITH_FULL_FIELD] }
        let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_HAS_NO_UPDATE] }

        it "updating succeeds" do
          described_class.call(
            user_id: dish_comparer.prepared_records[:user_record].id,
            dish_for_update: Command::Params::DishForUpdate.new(
              id: dish_comparer.prepared_records[:dish_record].id,
              name: dish_comparer.values[:name],
              meal_position: dish_comparer.values[:meal_position],
              comment: dish_comparer.values[:comment],
            ),
            dish_source_relation: Command::Params::DishSourceRelation.build_relation(
              dish_source_relation_comparer.prepared_records[:dish_source_record].type,
              dish_source_relation_comparer.prepared_records[:dish_source_relation_record].dish_id,
              dish_source_relation_comparer.prepared_records[:dish_source_relation_record].dish_source_id,
              dish_source_relation_comparer.prepared_records[:dish_source_relation_record].recipe_book_page,
            ),
          )

          dish_comparer.compare_to_expectation(self)
          dish_source_relation_comparer.compare_to_expectation(self)
        end
      end

      context "when update dish with different source relation param, " do
        let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_HAVE_NO_UPDATED] }
        let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_SHOULD_BE_UPDATED] }

        it "updating succeeds" do
          described_class.call(
            user_id: dish_comparer.prepared_records[:user_record].id,
            dish_for_update: Command::Params::DishForUpdate.new(
              id: dish_comparer.prepared_records[:dish_record].id,
            ),
            dish_source_relation: Command::Params::DishSourceRelation.build_relation(
              dish_source_relation_comparer.prepared_records[:dish_source_record].type,
              dish_source_relation_comparer.prepared_records[:dish_source_relation_record].dish_id,
              dish_source_relation_comparer.prepared_records[:dish_source_relation_record].dish_source_id,
              dish_source_relation_comparer.values[:recipe_book_page],
            ),
          )

          dish_comparer.compare_to_expectation(self)
          dish_source_relation_comparer.compare_to_expectation(self)
        end
      end

      context "when update dish from having source relation to no relation, " do
        let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_HAVE_NO_UPDATED] }
        let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_SHOULD_BE_REMOVED] }

        it "updating succeeds" do
          described_class.call(
            user_id: dish_comparer.prepared_records[:user_record].id,
            dish_for_update: Command::Params::DishForUpdate.new(
              id: dish_comparer.prepared_records[:dish_record].id,
            ),
            dish_source_relation: nil,
          )

          dish_comparer.compare_to_expectation(self)
          dish_source_relation_comparer.compare_to_expectation(self)
        end
      end

      context "when update dish with new tag, " do
        let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_HAVE_NO_UPDATED] }
        let!(:dish_tag_comparer) { COMPARERS[KEY_OF_TEST_DISH_TAG_SHOULD_BE_CREATED] }
        let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_SHOULD_BE_UPDATED] }

        it "updating succeeds" do
          dish_tag_comparer.build_records_for_test()

          described_class.call(
            user_id: dish_comparer.prepared_records[:user_record].id,
            dish_for_update: Command::Params::DishForUpdate.new(
              id: dish_comparer.prepared_records[:dish_record].id,
            ),
            dish_source_relation: Command::Params::DishSourceRelation.build_relation(
              dish_source_relation_comparer.prepared_records[:dish_source_record].type,
              dish_source_relation_comparer.prepared_records[:dish_source_relation_record].dish_id,
              dish_source_relation_comparer.prepared_records[:dish_source_relation_record].dish_source_id,
              dish_source_relation_comparer.values[:recipe_book_page],
            ),
            dish_tags: [
              ::Business::Dish::Dish::Tag::Command::Params::Tag.new(
                content: dish_tag_comparer.values[:content],
              ),
            ],
          )

          dish_comparer.compare_to_expectation(self)
          dish_source_relation_comparer.compare_to_expectation(self)
          dish_tag_comparer.compare_to_expectation(self, dish_id: dish_comparer.prepared_records[:dish_record].id)
        end
      end
    end
  end
end
