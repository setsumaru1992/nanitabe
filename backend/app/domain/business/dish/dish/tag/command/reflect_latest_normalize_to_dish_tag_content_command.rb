module Business::Dish::Dish::Tag
  class Command::ReflectLatestNormalizeToDishTagContentCommand < ::Business::Base::Command
    def call
      Repository.all_dish_tags.each do |dish_tag|
        dish_tag.normalized_content = Business::Dish::Word::Normalize::Command::NormalizeCommand.call(
          string_sequence: dish_tag.content,
        )

        Repository.update(dish_tag)
      end

      nil
    end
  end
end
