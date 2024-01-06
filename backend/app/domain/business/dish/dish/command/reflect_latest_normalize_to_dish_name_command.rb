module Business::Dish::Dish
  class Command::ReflectLatestNormalizeToDishNameCommand < ::Business::Base::Command
    def call
      Repository.all_dishes.each do |dish|
        dish.normalized_name = Business::Dish::Word::Normalize::Command::NormalizeCommand.call(
          string_sequence: dish.name,
        )

        Repository.update(dish, nil, force_update: true)
      end

      nil
    end
  end
end
