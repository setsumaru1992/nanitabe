module Bussiness::Base
  class Repository
    class << self
      def set_same_name_fields(source_obj, destination_obj, field_names)
        field_names.each do |field|
          destination_obj[field] = source_obj[field]
        end
        destination_obj
      end
    end
  end
end