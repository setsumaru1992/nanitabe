module Types::Input::Dish::Source
  class SourceForUpdate < ::Types::BaseInputObject
    argument :id, Int, required: true
    argument :name, String, required: false
    argument :type, Int, required: false
    argument :comment, String, required: false
  end
end
