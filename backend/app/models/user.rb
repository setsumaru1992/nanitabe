class User < ApplicationRecord
  has_one :login_user, dependent: :destroy
end
