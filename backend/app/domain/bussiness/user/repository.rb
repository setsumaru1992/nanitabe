module Bussiness::User
  class Repository < ::Bussiness::Base::Repository
    class << self
      def add(user)
        new_user_record = set_same_name_fields(user, ::User.new, [:id_param])
        new_user_record.save!

        user.id = new_user_record.id
        user
      end
    end
  end
end
