FactoryBot.define do
  factory :normalize_word_from_kana_to_kanji, class: NormalizeWord do
    entered_source { "ぶた" }
    entered_destination { "豚" }
    source { "ブタ" }
    destination { "豚" }
  end

  factory :normalize_word_from_ambiguous_1, class: NormalizeWord do
    entered_source { "鳥" }
    entered_destination { "鶏" }
    source { "鳥" }
    destination { "鶏" }
  end

  factory :normalize_word_from_ambiguous_2, class: NormalizeWord do
    entered_source { "とり" }
    entered_destination { "鶏" }
    source { "トリ" }
    destination { "鶏" }
  end

  factory :normalize_word_for_katsudon, class: NormalizeWord do
    entered_source { "かつ丼" }
    entered_destination { "カカカカカツツツツツ丼丼丼丼丼" }
    source { "カツ丼" }
    destination { "カカカカカツツツツツ丼丼丼丼丼" }
  end
end
