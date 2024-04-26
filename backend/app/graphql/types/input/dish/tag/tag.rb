module Types::Input::Dish::Tag
  class Tag < ::Types::Input::CommandParamConvertableInput
    CONVERT_DESTINATION_CLASS = ::Business::Dish::Dish::Tag::Command::Params::Tag

    argument :id, Int, required: false
    argument :content, String, required: true
  end
end
