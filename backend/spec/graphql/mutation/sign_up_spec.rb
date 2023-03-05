require 'rails_helper'

def fetch_mutation(mutation_string, variables)
  result = BackendSchema.execute(mutation_string, variables: variables)
  result.to_h["data"]
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

RSpec.describe Mutations::SignUp do
  context "signup" do
    it "signup succeed" do
      variables = {email: "hogehoge@gmail.com", password: "hogehogepassword"}
      fetch_mutation(build_signup_mutation, variables)
      expect(LoginUser.where(uid: variables[:email]).size).to eq 1
    end
  end
end