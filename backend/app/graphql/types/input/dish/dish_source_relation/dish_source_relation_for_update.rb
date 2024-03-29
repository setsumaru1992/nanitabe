module Types::Input::Dish::DishSourceRelation
  class DishSourceRelationForUpdate < ::Types::Input::CommandParamConvertableInput
    CONVERT_DESTINATION_CLASS = ::Business::Dish::Dish::Command::Params::DishSourceRelation

    argument :dish_id, Int, required: true
    argument :dish_source_id, Int, required: true
    argument :dish_source_type, Int, required: true

    argument :dish_source_relation_detail, DishSourceRelationDetail, required: true

    def convert_to_command_param
      Business::Dish::Dish::Command::Params::DishSourceRelation.build_relation(
        dish_source_type,
        dish_id,
        dish_source_id,
        arguments[:dish_source_relation_detail].detail_value_of(dish_source_type),
      )
    end
  end
end
