class CreateDishSources < ActiveRecord::Migration[7.0]
  def change
    create_table :dish_sources do |t|
      t.references :user, null: false, foreign_key: true
      t.string :name, null: false
      t.integer :type, null: false
      t.string :comment, null: true

      t.timestamps
    end
  end
end
