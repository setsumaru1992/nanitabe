class CreateDishTags < ActiveRecord::Migration[7.0]
  def change
    create_table :dish_tags do |t|
      t.references :dish, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :content, null: false

      t.timestamps
    end
    add_index :dish_tags, :content
  end
end
