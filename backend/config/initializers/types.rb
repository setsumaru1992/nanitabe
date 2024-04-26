class TypeAny < ActiveModel::Type::Value
  def cast_value(value)
    value
  end
end

ActiveModel::Type.register(:any, TypeAny)

# app配下で定義したかったがinitializersではまだapp配下のオートロードとかが済んでいないためこちらで定義
class CommandParamsType < ActiveModel::Type::Value
  def cast_value(value)
    raise "フィールドの値が不正です。" if value.invalid?

    value
  end
end

ActiveModel::Type.register(:command_params, CommandParamsType)

class CommandParamsListType < ActiveModel::Type::Value
  def cast_value(array_value)
    raise "値が配列ではありません" if array_value.class != Array
    array_value.each do |value|
      raise "フィールドの値が不正です。" if value.invalid?
    end

    array_value
  end
end

ActiveModel::Type.register(:command_params_list, CommandParamsListType)
