class ApplicationController < ActionController::Base
  include GraphqlDevise::SetUserByToken
end
