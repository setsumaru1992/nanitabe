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

    def extract_present_fields(value_hash, ignore_fields: [])
      value_hash.select do |field_name|
        next false if ignore_fields.include?(field_name.to_sym)

        value_hash[field_name].present?
      end
    end
  end
end
