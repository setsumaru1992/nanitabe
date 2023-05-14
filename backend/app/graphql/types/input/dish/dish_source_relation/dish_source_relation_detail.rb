module Types::Input::Dish::DishSourceRelation
  # class DishSourceRelationDetail < ::Types::BaseUnion # unionが許されるのは引数でなくて返り値なので諦める
  class DishSourceRelationDetail < ::Types::BaseInputObject
    one_of
    argument :recipe_book_page, Int, required: false
    argument :recipe_website_url, String, required: false
    argument :recipe_source_memo, String, required: false

    def detail_value_of(dish_source_type)
      source_type_prefix = ::Business::Dish::Dish::Source::Type

      case dish_source_type
      when source_type_prefix::YOUTUBE, source_type_prefix::WEBSITE
        recipe_website_url
      when source_type_prefix::RECIPE_BOOK
        recipe_book_page
      else
        recipe_source_memo
      end
    end

    def convert_to_command_param(dish_source_type)
      return nil if dish_source_type.blank?

      ::Business::Dish::Dish::Command::Params::DishSourceRelation.build_relation_detail(
        dish_source_type,
        detail_value_of(dish_source_type),
      )
    end
  end
end
