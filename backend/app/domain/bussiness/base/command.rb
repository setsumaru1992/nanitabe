module Bussiness::Base
  class Command
    include ActiveModel::Model
    include ActiveModel::Attributes

    def self.call(**params)
      command = new(params)
      command.call
    end

    def initialize(params)
      super(params)
      raise_error unless valid?
    end

    private_class_method :new

    def call
      raise NotImplementedError
    end

    def raise_error(errors_obj: errors)
      raise errors_obj.full_messages.join(", and ")
    end
  end
end