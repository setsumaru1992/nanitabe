require "rails_helper"
require_relative "../graphql_helper"

def build_signup_mutation
  <<~GRAPHQL
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
      user_record_size_before = ::User.all.size
      variables = { email: "", password: "" }
      fetch_mutation(build_signup_mutation, variables)

      expect(::LoginUser.where(uid: variables[:email]).present?).to eq false
      expect(::User.all.size).to eq user_record_size_before
    end
  end

  context "when signup with valid parameters" do
    it "signup succeed" do
      user_record_size_before = ::User.all.size
      variables = { email: "hogehoge@gmail.com", password: "hogehogepassword" }
      fetch_mutation(build_signup_mutation, variables)

      login_user = LoginUser.where(uid: variables[:email])
      expect(login_user.size).to eq 1
      expect(::User.all.size).to eq user_record_size_before + 1
    end
  end
end
