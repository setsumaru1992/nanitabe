class CreateMeals < ActiveRecord::Migration[7.0]
  def change
    create_table :meals do |t|
      t.references :user, null: false, foreign_key: true
      t.date :date, null: false
      t.integer :meal_type, null: false
      t.references :dish, null: false, foreign_key: true
      t.string :comment, null: true

      t.timestamps
    end
  end
end
