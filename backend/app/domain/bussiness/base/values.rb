module Bussiness::Base
  class Values
    include ActiveModel::Model
    include ActiveModel::Attributes

    def initialize(params)
      super(params)
      raise_error unless valid?
    end

    def [](attr)
      self.send(attr)
    end

    def []=(attr, value)
      self.send("#{attr}=", value)
    end

    private

    def raise_error(errors_obj: errors)
      raise errors_obj.full_messages.join(", and ")
    end
  end
end