module Bussiness::Base
  class Entity
    include ActiveModel::Model
    include ActiveModel::Attributes

    def [](attr)
      self.send(attr)
    end

    def []=(attr, value)
      self.send("#{attr}=", value)
    end

  end
end