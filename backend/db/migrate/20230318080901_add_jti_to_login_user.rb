class AddJtiToLoginUser < ActiveRecord::Migration[7.0]
  def change
    add_column :login_users, :jti, :string
    LoginUser.all.each { |user| user.update_column(:jti, SecureRandom.uuid) }
    add_index :login_users, :jti, unique: true
    change_column_null :login_users, :jti, null: false
  end
end
