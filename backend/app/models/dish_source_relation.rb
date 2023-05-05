class DishSourceRelation < ApplicationRecord
  self.primary_keys = :dish_id, :dish_source_id
  belongs_to :dish
  belongs_to :dish_source

  class << self
    def class_of(dish_source_type)
      source_type_prefix = ::Business::Dish::Dish::Source::Type
      case dish_source_type
      when source_type_prefix::YOUTUBE, source_type_prefix::WEBSITE
        SourceRelationOfWebsite
      when source_type_prefix::RECIPE_BOOK
        SourceRelationOfRecipeBook
      else
        SourceRelationOfOther
      end
    end
  end
end

class SourceRelationOfRecipeBook < DishSourceRelation
  validates :recipe_book_page, presence: true
  validates :recipe_website_url, absence: true
  validates :recipe_source_memo, absence: true

  def set_detail(detail)
    self[:recipe_book_page] = detail[:recipe_book_page]
    self[:recipe_website_url] = nil
    self[:recipe_source_memo] = nil
  end
end

class SourceRelationOfWebsite < DishSourceRelation
  validates :recipe_book_page, absence: true
  validates :recipe_website_url, presence: true
  validates :recipe_source_memo, absence: true

  def set_detail(detail)
    self[:recipe_website_url] = detail[:recipe_website_url]
    self[:recipe_book_page] = nil
    self[:recipe_source_memo] = nil
  end
end

class SourceRelationOfOther < DishSourceRelation
  validates :recipe_book_page, absence: true
  validates :recipe_website_url, absence: true
  validates :recipe_source_memo, presence: true

  def set_detail(detail)
    self[:recipe_source_memo] = detail[:recipe_source_memo]
    self[:recipe_book_page] = nil
    self[:recipe_website_url] = nil
  end
end
