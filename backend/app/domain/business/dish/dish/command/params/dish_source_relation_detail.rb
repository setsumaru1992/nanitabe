module Business::Dish::Dish
  class DetailWithUrl < ::Business::Base::CommandParams
    attribute :url, :string
    validates :url, presence: true
  end

  class DetailWithPage < ::Business::Base::CommandParams
    attribute :page, :integer
    validates :page, presence: true
  end

  class DetailWithMemo < ::Business::Base::CommandParams
    attribute :memo, :string
    validates :memo, presence: true
  end

  class Command::Params::DishSourceRelationDetail
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
