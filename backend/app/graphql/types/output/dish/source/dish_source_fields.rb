module Types::Output::Dish::Source
  module DishSourceFields
    include Types::BaseInterface

    field :id, Int, null: false
    field :name, String, null: false
    field :type, Int, null: false
  end
end
