# frozen_string_literal: true

require "rails_helper"
require_relative "../repository/repository_add_shared_examples"

module Business::User
  RSpec.describe Command::AddCommand do
    describe ".call" do
      context "when create user with essential field" do
        it "adding succeeds" do
          created_user = described_class.call

          user_should_be_created(id_param: created_user.id_param)
        end
      end
    end
  end
end
