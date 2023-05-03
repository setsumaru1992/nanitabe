module Types::Input::Dish::Source
  class SourceForCreate < ::Types::BaseInputObject
    argument :name, String, required: true
    argument :type, Int, required: true
    argument :comment, String, required: false
  end
end
