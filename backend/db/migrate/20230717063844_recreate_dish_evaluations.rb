class RecreateDishEvaluations < ActiveRecord::Migration[7.0]
  def change
    create_table :dish_evaluations, id: false do |t|
      t.references :dish, index: {:unique=>true}, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.float :score, null: false

      t.timestamps
    end
  end
end
