# frozen_string_literal: true

require "rails_helper"
require_relative "../../../meal/repository/repository_update_shared_examples"
require_relative "../../../dish/repository/repository_add_shared_examples"

module Bussiness::Dish
  module Command::Meal::Update
    RSpec.describe UpdateMealWithNewDishCommand do
      describe ".call" do
        before do
          dish_comparer.build_records_for_test()
          meal_comparer.build_records_for_test()
        end

        context "when update meal with essential params, " do
          let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED] }
          let!(:meal_comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_UPDATED] }

          it "updating succeeds" do
            updated_meal = described_class.call(
              user_id: dish_comparer.prepared_records[:user_record].id,
              dish_for_create: ::Bussiness::Dish::Dish::Command::Params::DishForCreate.new(
                name: dish_comparer.values[:name],
                meal_position: dish_comparer.values[:meal_position],
              ),
              meal_for_update: ::Bussiness::Dish::Meal::Command::Params::MealForUpdate.new(
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
          end
        end

        context "when update meal with full params, " do
          let!(:dish_comparer) { COMPARERS[KEY_OF_TEST_DISH_SHOULD_BE_CREATED_WITH_FULL_VALUES] }
          let!(:meal_comparer) { COMPARERS[KEY_OF_TEST_MEAL_SHOULD_BE_UPDATED_WITH_FULL_FIELD] }

          it "updating succeeds" do
            updated_meal = described_class.call(
              user_id: dish_comparer.prepared_records[:user_record].id,
              dish_for_create: ::Bussiness::Dish::Dish::Command::Params::DishForCreate.new(
                name: dish_comparer.values[:name],
                meal_position: dish_comparer.values[:meal_position],
                comment: dish_comparer.values[:comment],
              ),
              meal_for_update: ::Bussiness::Dish::Meal::Command::Params::MealForUpdate.new(
                id: meal_comparer.prepared_records[:meal_record].id,
                date: meal_comparer.values[:date],
                meal_type: meal_comparer.values[:meal_type],
                comment: meal_comparer.values[:comment],
              ),
            )

            dish_comparer.compare_to_expectation(self)
            meal_comparer.compare_to_expectation(self, dish_id: updated_meal.dish_id)
          end
        end
      end
    end
  end
end
