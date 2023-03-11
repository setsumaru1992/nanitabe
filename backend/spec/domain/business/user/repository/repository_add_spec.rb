# frozen_string_literal: true

require "rails_helper"

module Bussiness::User
  RSpec.describe Repository do
    describe ".add" do
      before do
        @id_param = "aaaaaaaaaa"
        @user = User.new(id_param: @id_param)
      end

      context "when add user," do
        it "adding succeeds" do
          described_class.add(@user)

          added_user_record = ::User.where(id_param: @id_param)
          expect(added_user_record.size).to eq 1
        end
      end
    end
  end
end


