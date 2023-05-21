# frozen_string_literal: true

require "rails_helper"
require_relative "../../meal/repository/repository_add_shared_examples"
require_relative "../../dish/repository/repository_add_shared_examples"
require_relative "../../dish/repository/repository_put_dish_relation_shared_examples"

module Business::Dish
  module Command::Meal
    RSpec.describe AddMealWithNewDishCommand do
      describe ".call" do
        before do
          dish_comparer.build_records_for_test()
          dish_source_relation_comparer.build_records_for_test()
          meal_comparer.build_records_for_test()
        end

        context "when create dish with essential params, " do
          let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED] }
          let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_HAS_NO_UPDATE] }
          let!(:meal_comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_CREATED] }

          it "adding succeeds" do
            _, created_dish = described_class.call(
              user_id: dish_comparer.prepared_records[:user_record].id,
              dish_for_create: ::Business::Dish::Dish::Command::Params::DishForCreate.new(
                name: dish_comparer.values[:name],
                meal_position: dish_comparer.values[:meal_position],
              ),
              meal_for_create: ::Business::Dish::Meal::Command::Params::MealForCreate.new(
                date: meal_comparer.values[:date],
                meal_type: meal_comparer.values[:meal_type],
              ),
            )

            created_dish_id = created_dish.id
            dish_comparer.compare_to_expectation(self)
            meal_comparer.compare_to_expectation(self, dish_id: created_dish_id)
            dish_source_relation_comparer.compare_to_expectation(self)
          end
        end

        context "when create dish with full params, " do
          let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED_WITH_FULL_VALUES] }
          let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_HAS_NO_UPDATE] }
          let!(:meal_comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_CREATED_WITH_FULL_FIELD] }

          it "adding succeeds" do
            _, created_dish = described_class.call(
              user_id: dish_comparer.prepared_records[:user_record].id,
              dish_for_create: ::Business::Dish::Dish::Command::Params::DishForCreate.new(
                name: dish_comparer.values[:name],
                meal_position: dish_comparer.values[:meal_position],
                comment: dish_comparer.values[:comment],
              ),
              meal_for_create: ::Business::Dish::Meal::Command::Params::MealForCreate.new(
                date: meal_comparer.values[:date],
                meal_type: meal_comparer.values[:meal_type],
                comment: meal_comparer.values[:comment],
              ),
            )

            created_dish_id = created_dish.id
            dish_comparer.compare_to_expectation(self)
            meal_comparer.compare_to_expectation(self, dish_id: created_dish_id)
            dish_source_relation_comparer.compare_to_expectation(self)
          end
        end

        context "when add meal with source relation param, " do
          let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED] }
          let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_SHOULD_BE_CREATED] }
          let!(:meal_comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_CREATED] }

          it "updating succeeds" do
            dish_module = ::Business::Dish::Dish
            _, created_dish = described_class.call(
              user_id: dish_comparer.prepared_records[:user_record].id,
              dish_for_create: ::Business::Dish::Dish::Command::Params::DishForCreate.new(
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
              meal_for_create: ::Business::Dish::Meal::Command::Params::MealForCreate.new(
                date: meal_comparer.values[:date],
                meal_type: meal_comparer.values[:meal_type],
              ),
            )

            created_dish_id = created_dish.id
            dish_comparer.compare_to_expectation(self)
            meal_comparer.compare_to_expectation(self, dish_id: created_dish_id)
            dish_source_relation_comparer.compare_to_expectation(self, dish_id: created_dish_id)
          end
        end
      end
    end
  end
end
