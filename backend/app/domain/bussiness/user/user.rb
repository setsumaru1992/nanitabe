module Bussiness::User
  class User < ::Bussiness::Base::Entity
    attribute :id, :integer
    attribute :id_param, :string
    validates :id_param, presence: true
  end
end
