module Business::Dish::Dish::Tag
  class Command::UpdateTagsCommand < ::Business::Base::Command
    attribute :dish_id, :integer
    validates :dish_id, presence: true

    attribute :user_id, :integer
    validates :user_id, presence: true

    attribute :dish_tags, :command_params_array
    validates :dish_tags, disallow_nil: true

    def call
      existing_dish_tags = Repository.fetch_tags_of_dish(dish_id)

      add_tags_if_need(dish_tags, dish_id, user_id)
      update_tags_if_need
      delete_tags_if_need(existing_dish_tags, dish_tags)
    end

    def add_tags_if_need(dish_tags, dish_id, user_id)
      dish_tags
        .select { |tag| tag.id.blank?}
        .map do |tag|
          Tag.new(
            user_id:,
            dish_id:,
            content: tag.content
          )
        end.map do |tag|
          Repository.add(tag)
        end
    end

    def update_tags_if_need
      # TODO: 実装時にロジック記載
    end

    def delete_tags_if_need(existing_dish_tags, dish_tags)
      dish_tag_ids = dish_tags.map(&:id)
      existing_dish_tags
        .reject {|existing_dish_tag| dish_tag_ids.include?(existing_dish_tag.id)}
        .each do |tag_needing_removed|
          Repository.remove(tag_needing_removed.id)
        end
    end
  end
end