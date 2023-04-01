# frozen_string_literal: true

require "rails_helper"
require_relative "../../../meal/repository/repository_add_shared_examples"
require_relative "../../../dish/repository/repository_add_shared_examples"

module Bussiness::Dish
  module Command::Meal::Create
    RSpec.describe CreateMealWithNewDishCommand do
      describe ".call" do
        before do
          dish_comparer.build_records_for_test()
          meal_comparer.build_records_for_test()
        end

        context "when create dish with essential params, " do
          let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED] }
          let!(:meal_comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_CREATED] }

          it "adding succeeds" do
            created_meal = described_class.call(
              user_id: dish_comparer.prepared_records[:user_record].id,
              dish_for_create: ::Bussiness::Dish::Dish::Command::Params::DishForCreate.new(
                name: dish_comparer.values[:name],
                meal_position: dish_comparer.values[:meal_position],
                ),
              meal_for_create: ::Bussiness::Dish::Meal::Command::Params::MealForCreate.new(
                date: meal_comparer.values[:date],
                meal_type: meal_comparer.values[:meal_type],
                )
            )

            dish_comparer.compare_to_expectation(self)
            meal_comparer.compare_to_expectation(self, dish_id: created_meal.dish_id)
          end
        end

        context "when create dish with full params, " do
          let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED_WITH_FULL_VALUES] }
          let!(:meal_comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_CREATED_WITH_FULL_FIELD] }

          it "adding succeeds" do
            created_meal = described_class.call(
              user_id: dish_comparer.prepared_records[:user_record].id,
              dish_for_create: ::Bussiness::Dish::Dish::Command::Params::DishForCreate.new(
                name: dish_comparer.values[:name],
                meal_position: dish_comparer.values[:meal_position],
                comment: dish_comparer.values[:comment],
                ),
              meal_for_create: ::Bussiness::Dish::Meal::Command::Params::MealForCreate.new(
                date: meal_comparer.values[:date],
                meal_type: meal_comparer.values[:meal_type],
                comment: meal_comparer.values[:comment],
                )
            )

            dish_comparer.compare_to_expectation(self)
            meal_comparer.compare_to_expectation(self, dish_id: created_meal.dish_id)
          end
        end
      end
    end
  end
end
