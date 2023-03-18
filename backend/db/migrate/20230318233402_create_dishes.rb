class CreateDishes < ActiveRecord::Migration[7.0]
  def change
    create_table :dishes do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.string :kana, null: false
      t.integer :meal_position, null: false
      t.string :comment, null: true

      t.timestamps
    end
  end
end
