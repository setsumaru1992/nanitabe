# frozen_string_literal: true

require "rails_helper"
require_relative "../../meal/repository/repository_update_shared_examples"
require_relative "../../dish/repository/repository_add_shared_examples"
require_relative "../../dish/repository/repository_put_dish_relation_shared_examples"
require_relative "../../dish/tag/repository/repository_add_shared_examples"

module Business::Dish
  module Command::Meal
    RSpec.describe UpdateMealWithNewDishCommand do
      describe ".call" do
        before do
          dish_comparer.build_records_for_test()
          dish_source_relation_comparer.build_records_for_test()
          meal_comparer.build_records_for_test()
        end

        context "when update meal with essential params, " do
          let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED] }
          let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_HAS_NO_UPDATE] }
          let!(:meal_comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_UPDATED] }

          it "updating succeeds" do
            updated_meal, = described_class.call(
              user_id: dish_comparer.prepared_records[:user_record].id,
              dish_for_create: ::Business::Dish::Dish::Command::Params::DishForCreate.new(
                name: dish_comparer.values[:name],
                meal_position: dish_comparer.values[:meal_position],
              ),
              meal_for_update: ::Business::Dish::Meal::Command::Params::MealForUpdate.new(
                id: meal_comparer.prepared_records[:meal_record].id,
                meal_type: meal_comparer.values[:meal_type],
              ),
            )

            dish_comparer.compare_to_expectation(self)
            meal_comparer.compare_to_expectation(
              self,
              dish_id: updated_meal.dish_id,
              **specified_field_values_of_object(meal_comparer.prepared_records[:meal_record], [:date, :comment]),
            )
            dish_source_relation_comparer.compare_to_expectation(self)
          end
        end

        context "when update meal with full params, " do
          let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED_WITH_FULL_VALUES] }
          let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_HAS_NO_UPDATE] }
          let!(:meal_comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_UPDATED_WITH_FULL_FIELD] }

          it "updating succeeds" do
            updated_meal, = described_class.call(
              user_id: dish_comparer.prepared_records[:user_record].id,
              dish_for_create: ::Business::Dish::Dish::Command::Params::DishForCreate.new(
                name: dish_comparer.values[:name],
                meal_position: dish_comparer.values[:meal_position],
                comment: dish_comparer.values[:comment],
              ),
              meal_for_update: ::Business::Dish::Meal::Command::Params::MealForUpdate.new(
                id: meal_comparer.prepared_records[:meal_record].id,
                date: meal_comparer.values[:date],
                meal_type: meal_comparer.values[:meal_type],
                comment: meal_comparer.values[:comment],
              ),
            )

            dish_comparer.compare_to_expectation(self)
            meal_comparer.compare_to_expectation(self, dish_id: updated_meal.dish_id)
            dish_source_relation_comparer.compare_to_expectation(self)
          end
        end

        context "when update meal with source relation param, " do
          let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED] }
          let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_SHOULD_BE_CREATED] }
          let!(:meal_comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_UPDATED] }

          it "updating succeeds" do
            dish_module = ::Business::Dish::Dish
            updated_meal, = described_class.call(
              user_id: dish_comparer.prepared_records[:user_record].id,
              dish_for_create: dish_module::Command::Params::DishForCreate.new(
                name: dish_comparer.values[:name],
                meal_position: dish_comparer.values[:meal_position],
              ),
              dish_source_for_read: dish_module::Source::Command::Params::SourceForRead.new(
                id: dish_source_relation_comparer.prepared_records[:dish_source_record].id,
                type: dish_source_relation_comparer.prepared_records[:dish_source_record].type,
              ),
              dish_source_relation_detail: dish_module::Command::Params::DishSourceRelation.build_relation_detail(
                dish_source_relation_comparer.prepared_records[:dish_source_record].type,
                dish_source_relation_comparer.values[:recipe_book_page],
              ),
              meal_for_update: ::Business::Dish::Meal::Command::Params::MealForUpdate.new(
                id: meal_comparer.prepared_records[:meal_record].id,
                meal_type: meal_comparer.values[:meal_type],
              ),
            )

            dish_comparer.compare_to_expectation(self)
            meal_comparer.compare_to_expectation(
              self,
              dish_id: updated_meal.dish_id,
              **specified_field_values_of_object(meal_comparer.prepared_records[:meal_record], [:date, :comment]),
            )
            dish_source_relation_comparer.compare_to_expectation(
              self,
              dish_id: updated_meal.dish_id,
            )
          end
        end

        context "when update meal with new dish having new tag, " do
          let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED] }
          let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_HAS_NO_UPDATE] }
          let!(:dish_tag_comparer) { COMPARERS[KEY_OF_TEST_DISH_TAG_SHOULD_BE_CREATED] }
          let!(:meal_comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_UPDATED] }

          it "updating succeeds" do
            dish_tag_comparer.build_records_for_test()

            updated_meal, = described_class.call(
              user_id: dish_comparer.prepared_records[:user_record].id,
              dish_for_create: ::Business::Dish::Dish::Command::Params::DishForCreate.new(
                name: dish_comparer.values[:name],
                meal_position: dish_comparer.values[:meal_position],
              ),
              dish_tags: [
                ::Business::Dish::Dish::Tag::Command::Params::Tag.new(
                  content: dish_tag_comparer.values[:content],
                ),
              ],
              meal_for_update: ::Business::Dish::Meal::Command::Params::MealForUpdate.new(
                id: meal_comparer.prepared_records[:meal_record].id,
                meal_type: meal_comparer.values[:meal_type],
              ),
            )

            dish_comparer.compare_to_expectation(self)
            meal_comparer.compare_to_expectation(
              self,
              dish_id: updated_meal.dish_id,
              **specified_field_values_of_object(meal_comparer.prepared_records[:meal_record], [:date, :comment]),
            )
            dish_source_relation_comparer.compare_to_expectation(self)
            dish_tag_comparer.compare_to_expectation(self, dish_id: updated_meal.dish_id)
          end
        end
      end
    end
  end
end
