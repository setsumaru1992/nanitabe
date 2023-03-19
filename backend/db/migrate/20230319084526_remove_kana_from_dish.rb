class RemoveKanaFromDish < ActiveRecord::Migration[7.0]
  def change
    remove_column :dishes, :kana
  end
end
