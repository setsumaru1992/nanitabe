class AddUserIdToLoginUser < ActiveRecord::Migration[7.0]
  def change
    add_reference :login_users, :user, null: false, foreign_key: true
  end
end
