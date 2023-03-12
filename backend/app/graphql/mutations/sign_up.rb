module Mutations
  class SignUp < ::GraphqlDevise::Mutations::Register
    def resolve(confirm_url: nil, **attrs)
      graphql_devise_result = super(confirm_url: confirm_url, **attrs)

      # TODO: ApplicationCommandとしてリライト（resolverでCRUDやりたくない）
      user = ::Bussiness::User::Command::CreateCommand.call
      login_user_record = LoginUser.find_by(email: attrs[:email])
      login_user_record.user_id = user.id
      login_user_record.save!

      graphql_devise_result
    end
  end
end