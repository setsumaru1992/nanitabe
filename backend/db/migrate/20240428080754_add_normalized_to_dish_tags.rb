class AddNormalizedToDishTags < ActiveRecord::Migration[7.0]
  def change
    add_column :dish_tags, :normalized_content, :string
    add_index :dish_tags, :normalized_content
  end
end
