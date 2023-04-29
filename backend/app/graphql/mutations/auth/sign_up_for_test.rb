# HACK: さすがにテスト用のコードが実運用コードに侵食して気持ち悪いから、specディレクトリ内で完結できるならそうする
module Mutations::Auth
  class SignUpForTest < ::GraphqlDevise::Mutations::Register
    argument :userid, Int, required: false

    def resolve(userid: nil, confirm_url: nil, **attrs)
      graphql_devise_result = super(confirm_url:, **attrs)

      if userid.blank?
        ::Application::Command::CreateUserWithExistingLoginUserCommand.call(
          email_for_login: attrs[:email],
        )
      else
        login_user_record = ::LoginUser.find_by(email: attrs[:email])
        login_user_record.user_id = userid
        login_user_record.save!
      end

      graphql_devise_result
    end
  end
end
