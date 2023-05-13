module Types::Input::Dish::Source
  class SourceForCreate < ::Types::Input::CommandParamConvertableInput
    CONVERT_DESTINATION_CLASS = ::Business::Dish::Dish::Source::Command::Params::SourceForCreate

    argument :name, String, required: true
    argument :type, Int, required: true
    argument :comment, String, required: false
  end
end
