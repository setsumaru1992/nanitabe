module Bussiness::User
  class User < ::Bussiness::Base::Entity
    attribute :id, :integer
    attribute :id_param, :string
    validates :id_param, presence: true

    class << self
      def generate_id_param
        "jfahrreoifjraeof;ehih"
      end
    end
  end
end
