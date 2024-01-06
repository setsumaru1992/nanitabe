class CreateNormalizeWords < ActiveRecord::Migration[7.0]
  def change
    create_table :normalize_words do |t|
      t.string :entered_source, null: false
      t.string :entered_destination, null: false
      t.string :source, null: false
      t.string :destination, null: false

      t.timestamps
    end
    add_index :normalize_words, :source
  end
end
