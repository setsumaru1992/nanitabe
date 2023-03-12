class ChangeUserIdRemoveNotNullOnLoginUser < ActiveRecord::Migration[7.0]
  def change
    change_column_null :login_users, :user_id, null: true
  end
end
