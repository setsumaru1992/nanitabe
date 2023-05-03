class CreateDishSourceRelations < ActiveRecord::Migration[7.0]
  def change
    create_table :dish_source_relations, id: false do |t|
      t.references :dish, index: {:unique=>true}, null: false, foreign_key: true
      t.references :dish_source, null: false, foreign_key: true
      t.integer :recipe_book_page, null: true
      t.string :recipe_website_url, null: true
      t.string :recipe_source_memo, null: true

      t.timestamps
    end
  end
end
