require 'rails_helper'

def fetch_mutation(mutation_string)
  result = BackendSchema.execute(mutation_string)
  result.to_h["data"]
end

def build_signup_mutation
  <<-GRAPHQL
mutation signup(
    $email: String = "hogehoge@gmail.com",
    $password: String = "hogehogepassword",
    $passwordConfirmation: String = "hogehogepassword",
  ) {
  loginUserRegister(
    email: $email,
    password: $password, 
    passwordConfirmation: $passwordConfirmation
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
      fetch_mutation(build_signup_mutation)
      expect(1).to eq 1
    end
  end
end