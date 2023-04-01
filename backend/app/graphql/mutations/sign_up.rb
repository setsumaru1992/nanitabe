module Mutations
  class SignUp < ::GraphqlDevise::Mutations::Register
    def resolve(confirm_url: nil, **attrs)
      graphql_devise_result = super(confirm_url: confirm_url, **attrs)

      ::Application::Command::CreateUserWithExistingLoginUserCommand.call(
        email_for_login: attrs[:email]
      )

      graphql_devise_result
    end
  end
end
