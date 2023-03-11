module Bussiness::Base
  class Finder
    include ActiveModel::Model
    include ActiveModel::Attributes

    def self.call(conditions = {})
      finder = new(conditions)
      finder.fetch
    end

    def initialize(conditions)
      super(conditions)
      raise "条件の値が不正です。" unless valid?
    end

    private_class_method :new

    def fetch
      raise NotImplementedError
    end
  end
end