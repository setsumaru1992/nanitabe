module Business::User
  class User < ::Business::Base::Entity
    attribute :id, :integer
    attribute :id_param, :string
    validates :id_param, presence: true

    class << self
      def generate_id_param
        SecureRandom.alphanumeric(16)
      end
    end
  end
end
