FactoryBot.define do
  factory :dish do
    user { ::User.find_by(id_param: "userrrrrrrrrrrrrrr") || FactoryBot.create(:user) }
    name { "カツ丼" }
    meal_position { 1 }
  end
end
