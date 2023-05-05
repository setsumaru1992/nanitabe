module Business::Dish::Dish
  module Command::Params
    class DetailWithUrl < ::Business::Base::CommandParams
      attribute :recipe_website_url, :string
      validates :recipe_website_url, presence: true
    end

    class DetailWithPage < ::Business::Base::CommandParams
      attribute :recipe_book_page, :integer
      validates :recipe_book_page, presence: true
    end

    class DetailWithMemo < ::Business::Base::CommandParams
      attribute :recipe_source_memo, :string
      validates :recipe_source_memo, presence: true
    end

    class DishSourceRelationDetail
      class << self
        def build(dish_source_type, detail_hash)
          source_type_prefix = ::Business::Dish::Dish::Source::Type
          case dish_source_type
          when source_type_prefix::YOUTUBE, source_type_prefix::WEBSITE
            DetailWithUrl.new(**detail_hash)
          when source_type_prefix::RECIPE_BOOK
            DetailWithPage.new(**detail_hash)
          else
            DetailWithMemo.new(**detail_hash)
          end
        end
      end
    end
  end
end
