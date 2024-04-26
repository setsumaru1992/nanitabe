# frozen_string_literal: true

require "rails_helper"
require_relative "../repository/repository_add_shared_examples"
require_relative "../repository/repository_remove_shared_examples"

module Business::Dish::Dish::Tag
  RSpec.describe Command::UpdateTagsCommand do
    xcontext "when add tag, " do
      let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_TAG_SHOULD_BE_CREATED] }

      before do
        comparer.build_records_for_test()
      end

      it "adding succeeds" do
        described_class.call(
          user_id: comparer.prepared_records[:user_record].id,
          dish_id: comparer.prepared_records[:dish_record].id,
          dish_tags: [
            Command::Params::Tag.new(
              content: comparer.values[:content]
            )
          ]
        )

        comparer.compare_to_expectation(self)
      end
    end

    xcontext "when remove tag, " do
      let!(:comparer) { COMPARERS[KEY_OF_TEST_DISH_TAG_SHOULD_BE_REMOVED] }

      before do
        comparer.build_records_for_test()
      end

      it "removing succeeds" do
        described_class.call(
          user_id: comparer.prepared_records[:user_record].id,
          dish_id: comparer.prepared_records[:dish_record].id,
          dish_tags: []
        )

        comparer.compare_to_expectation(self)
      end
    end

    xcontext "when add tags, " do

    end

    context "when add a tag in case there're existing tag, " do

    end

    xcontext "when remove an existing tag in case there're existing tags, " do

    end

    xcontext "when remove tags, " do

    end
  end
end