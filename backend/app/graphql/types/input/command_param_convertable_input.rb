module Types::Input
  class CommandParamConvertableInput < ::Types::BaseInputObject
    CONVERT_DESTINATION_CLASS = nil

    def convert_to_command_param
      self.class::CONVERT_DESTINATION_CLASS.new(**to_hash)
    end
  end
end
