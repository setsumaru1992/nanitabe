class DropDishEvaluations < ActiveRecord::Migration[7.0]
  def change
    drop_table :dish_evaluations
  end
end
