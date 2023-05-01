module Business::Base
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

    private

    def group_rows_by_key(rows, key_name, rows_name)
      grouped_hash = rows.group_by { |row| row[key_name.to_sym] }
      grouped_hash.map do |(key_value, grouped_rows)|
        {
          key_name.to_sym => key_value,
          rows_name.to_sym => grouped_rows,
        }
      end || []
    end
  end
end
