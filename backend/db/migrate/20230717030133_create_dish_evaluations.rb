class CreateDishEvaluations < ActiveRecord::Migration[7.0]
  def change
    create_table :dish_evaluations do |t|
      t.references :user, null: false, foreign_key: true
      t.references :dish, null: false, foreign_key: true
      t.float :score, null: false

      t.timestamps
    end
  end
end
