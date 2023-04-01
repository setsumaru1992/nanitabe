# TODO: 多分YAGNIだから、複数の値が必要なときになったらそのタイミングで、ちゃんとワークする方法を模索する
# やってる機構自体は別にいいんだけど、事前データ作成、デフォルト値設定と期待値チェック関数の名前が長すぎるのがネックだしスネークケースで書かないといけない。
# rails_helperで格納場所を用意して、そこにshareするテストを示す文字列をキーにして以下のものをスッキリ入れるとかかな。
def default_values_for_the_test_user_should_be_created
  {
    id_param: "aaaaaaaaaa",
  }
end

def user_should_be_created(**arg_values)
  values = default_values_for_the_test_user_should_be_created.merge(arg_values)
  added_user_record = ::User.where(id_param: values[:id_param])
  expect(added_user_record.size).to eq 1
end

KEY_OF_TEST_USER_SHOULD_BE_CREATED = "USER_SHOULD_BE_CREATED"
comparer = ExpectationComparer.new(KEY_OF_TEST_USER_SHOULD_BE_CREATED, default_values_for_the_test_user_should_be_created)

comparer.define_expectation do |values|
  added_user_record = ::User.where(id_param: values[:id_param])
  expect(added_user_record.size).to eq 1
end

COMPARERS[KEY_OF_TEST_USER_SHOULD_BE_CREATED] = comparer
