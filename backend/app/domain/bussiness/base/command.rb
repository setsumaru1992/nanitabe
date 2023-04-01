module Bussiness::Base
  class Command < Values
    def self.call(**params)
      command = new(params)
      command.call
    end

    private_class_method :new

    def call
      raise NotImplementedError
    end
  end
end
