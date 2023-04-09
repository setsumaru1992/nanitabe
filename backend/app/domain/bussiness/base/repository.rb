module Bussiness::Base
  class Repository
    class << self
      def set_same_name_fields(source_obj, destination_obj, field_names)
        field_names.each do |field|
          destination_obj[field] = source_obj[field]
        end
        destination_obj
      end

      def build_values_object_with_existing_object(source_obj, values_object_class, field_names)
        field_values = field_names.map do |field_name|
          [field_name, source_obj[field_name]]
        end.to_h

        values_object_class.new(**field_values)
      end
    end
  end
end
