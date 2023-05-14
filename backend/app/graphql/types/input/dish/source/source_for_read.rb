module Types::Input::Dish::Source
  class SourceForRead < ::Types::Input::CommandParamConvertableInput
    CONVERT_DESTINATION_CLASS = ::Business::Dish::Dish::Source::Command::Params::SourceForRead

    argument :id, Int, required: true
    argument :name, String, required: false
    argument :type, Int, required: false
    argument :comment, String, required: false
  end
end
