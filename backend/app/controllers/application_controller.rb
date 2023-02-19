class ApplicationController < ActionController::Base
  include GraphqlDevise::SetUserByToken
  protect_from_forgery with: :null_session # 暫定　CSRFキー作るまで
end
