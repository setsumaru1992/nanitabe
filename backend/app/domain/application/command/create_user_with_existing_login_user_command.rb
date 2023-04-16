module Application::Command
  class CreateUserWithExistingLoginUserCommand < ::Business::Base::Command
    attribute :email_for_login, :string
    validates :email_for_login, presence: true

    def call
      created_user = ::Business::User::Command::CreateCommand.call

      # NOTE: 本来コマンドでCRUD操作をせず、Repositoryでやるべきだが、LoginUserはアプリの持ち物でないため許容
      login_user_record = ::LoginUser.find_by(email: email_for_login)
      login_user_record.user_id = created_user.id
      login_user_record.save!

      created_user
    end
  end
end
