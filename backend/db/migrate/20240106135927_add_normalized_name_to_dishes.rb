class AddNormalizedNameToDishes < ActiveRecord::Migration[7.0]
  def change
    add_column :dishes, :normalized_name, :string
  end
end
