module Mutations::Auth
  class SignUp < ::GraphqlDevise::Mutations::Register
    def resolve(confirm_url: nil, **attrs)
      graphql_devise_result = super(confirm_url:, **attrs)

      ::Application::Command::AddUserWithExistingLoginUserCommand.call(
        email_for_login: attrs[:email],
      )

      graphql_devise_result
    end
  end
end
