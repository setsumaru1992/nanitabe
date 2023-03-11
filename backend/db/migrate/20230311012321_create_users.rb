class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :id_param, null: false

      t.timestamps
    end
    add_index :users, :id_param, unique: true
  end
end
