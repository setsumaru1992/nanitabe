require 'rails_helper'

def fetch_mutation(mutation_string, variables)
  post "/graphql", params: {query: mutation_string, variables: variables}
  response_body = JSON.parse(response.body)
  response_body['data']
end

def build_signup_mutation
  <<-GRAPHQL
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
    }
  }
}
  GRAPHQL
end

RSpec.describe Mutations::SignUp, type: :request do
  context "when signup with invalid parameters" do
    it "signup failed" do
      variables = {email: "", password: ""}
      fetch_mutation(build_signup_mutation, variables)

      expect(::LoginUser.where(uid: variables[:email]).present?).to eq false
      expect(::User.all.present?).to eq false
    end
  end

  context "when signup with valid parameters" do
    it "signup succeed" do
      variables = {email: "hogehoge@gmail.com", password: "hogehogepassword"}
      fetch_mutation(build_signup_mutation, variables)

      login_user = LoginUser.where(uid: variables[:email])
      expect(login_user.size).to eq 1
      expect(login_user.first.user.present?).to eq true
    end
  end
end