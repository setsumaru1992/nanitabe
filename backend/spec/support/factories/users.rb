require_relative "./user_repository"

FactoryBot.define do
  factory :user do
    id_param { ID_PARAM_OF_USER }
  end
end
