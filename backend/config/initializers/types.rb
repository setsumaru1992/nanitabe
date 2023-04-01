class TypeAny < ActiveModel::Type::Value
  def cast_value(value)
    value
  end
end

# app配下で定義したかったがinitializersではまだモジュール定義とかが済んでいないためこちらで定義
class CommandParamsType < ActiveModel::Type::Value
  def cast_value(value)
    raise "フィールドの値が不正です。" if value.invalid?

    value
  end
end

ActiveModel::Type.register(:any, TypeAny)
ActiveModel::Type.register(:command_params, CommandParamsType)
