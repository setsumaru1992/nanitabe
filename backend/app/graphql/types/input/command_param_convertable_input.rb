module Types::Input
  class CommandParamConvertableInput < ::Types::BaseInputObject
    CONVERT_DESTINATION_CLASS = nil

    def convert_to_command_param
      values = to_hash
      puts values
      puts self.class::CONVERT_DESTINATION_CLASS
      self.class::CONVERT_DESTINATION_CLASS.new(**values)
    end
  end
end
