# frozen_string_literal: true

require "rails_helper"
require_relative "../../../meal/repository/repository_add_shared_examples"
require_relative "../../../dish/repository/repository_add_shared_examples"
require_relative "../../../dish/source/repository/repository_add_shared_examples"
require_relative "../../../dish/repository/repository_put_dish_relation_shared_examples"

module Business::Dish
  module Command::Meal::Create
    RSpec.describe CreateMealWithNewDishAndNewSourceCommand do
      describe ".call" do
        # CreateMealWithNewDishCommandのテストとの差分、つまりこのCommandゆえのテストを記載
        before do
          dish_comparer.build_records_for_test()
          dish_source_comparer.build_records_for_test()
          dish_source_relation_comparer.build_records_for_test()
          meal_comparer.build_records_for_test()
        end

        context "when create meal with new dish and new source, " do
          let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED] }
          let!(:dish_source_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_SHOULD_BE_CREATED] }
          let!(:dish_source_relation_comparer) { COMPARERS[KEY_OF_TEST_DISH_SOURCE_RELATION_SHOULD_BE_CREATED] }
          let!(:meal_comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_CREATED] }

          it "creating succeeds" do
            dish_module = ::Business::Dish::Dish
            _, created_dish, created_dish_source = described_class.call(
              user_id: dish_comparer.prepared_records[:user_record].id,
              dish_for_create: ::Business::Dish::Dish::Command::Params::DishForCreate.new(
                name: dish_comparer.values[:name],
                meal_position: dish_comparer.values[:meal_position],
              ),
              dish_source_for_create: dish_module::Source::Command::Params::SourceForCreate.new(
                name: dish_source_comparer.values[:name],
                type: dish_source_comparer.values[:type],
                comment: dish_source_comparer.values[:comment],
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

            dish_comparer.compare_to_expectation(self)
            dish_source_comparer.compare_to_expectation(self)
            dish_source_relation_comparer.compare_to_expectation(
              self,
              dish_id: created_dish.id,
              dish_source_id: created_dish_source.id,
            )
            meal_comparer.compare_to_expectation(
              self,
              dish_id: created_dish.id,
            )
          end
        end
      end
    end
  end
end
