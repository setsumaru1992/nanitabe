# frozen_string_literal: true

require "rails_helper"
require_relative "./repository_add_shared_examples"

module Bussiness::User
  RSpec.describe Repository do
    describe ".add" do
      before do
        @values = default_values_for_the_test_user_should_be_created
        @user = User.new(id_param: @values[:id_param])
      end

      context "when add user," do
        it "adding succeeds" do
          described_class.add(@user)

          user_should_be_created
        end
      end
    end
  end
end
