module Business::User
  class Command::AddCommand < ::Business::Base::Command
    def call
      while true
        id_param = User.generate_id_param
        break if Repository.unique_id_param?(id_param)
      end

      user = User.new(id_param:)
      created_user = Repository.add(user)
      created_user
    end
  end
end
