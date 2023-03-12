# TODO: 多分YAGNIだから、複数の値が必要なときになったらそのタイミングで、ちゃんとワークする方法を模索する
# やってる機構自体は別にいいんだけど、デフォルト値設定と期待値チェック関数の名前が長すぎるのがネックだしスネークケースで書かないといけない。
# rails_helperで格納場所を用意して、そこにshareするテストを示す文字列をキーにして以下のものをスッキリ入れるとかかな。
def default_values_for_the_test_user_should_be_created
  {
    id_param: "aaaaaaaaaa"
  }
end

def user_should_be_created(**arg_values)
  values = default_values_for_the_test_user_should_be_created.merge(arg_values)
  added_user_record = ::User.where(id_param: values[:id_param])
  expect(added_user_record.size).to eq 1
end