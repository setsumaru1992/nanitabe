require_relative "./graphql_helper"

def fetch_auth_header_values
  existing_login_user = LoginUser.where(uid: auth_variables[:email]).joins(:user)
  credential = if existing_login_user.present?
                 fetch_exisiting_login_user_credential
               else
                 fetch_new_login_user_credential
               end

  {
    "access-token" => credential["accessToken"],
    "client" => credential["client"],
    "uid" => credential["uid"],
  }
end

def fetch_exisiting_login_user_credential
  login_mutation = <<~GRAPHQL
    mutation login($email: String!, $password: String!) {
      loginUserLogin(email: $email, password: $password) {
        credentials {
          accessToken
          client
          uid
        }
      }
    }
  GRAPHQL
  fetch_mutation(login_mutation, auth_variables)["loginUserLogin"]["credentials"]
end

def fetch_new_login_user_credential
  signup_mutation = <<~GRAPHQL
    mutation signup(
        $email: String = "",
        $password: String = "",
      ) {
      loginUserRegister(
        email: $email,
        password: $password,
        passwordConfirmation: $password
      ) {
        credentials {
          accessToken
          client
          uid
        }
      }
    }
  GRAPHQL
  fetch_mutation(signup_mutation, auth_variables)["loginUserRegister"]["credentials"]
end

def auth_variables
  {
    email: "default_test_user@example.com",
    password: "default_test_user",
  }
end
