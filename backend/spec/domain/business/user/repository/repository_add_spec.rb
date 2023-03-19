# frozen_string_literal: true

require "rails_helper"
require_relative "./repository_add_shared_examples"

module Bussiness::User
  RSpec.describe Repository do
    describe ".add" do
      before do
        @comparerer = COMPARERS[KEY_OF_TEST_USER_SHOULD_BE_CREATED]
        @user = User.new(id_param: @comparerer.values[:id_param])
      end

      context "when add user," do
        it "adding succeeds" do
          described_class.add(@user)

          @comparerer.compare_to_expectation(self)
        end
      end
    end
  end
end
