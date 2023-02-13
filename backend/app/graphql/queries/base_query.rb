module Queries
  # TODO: ログイン時のみ、authorized?でログイン済みユーザを必要としないクラスを使用
  class BaseQuery < GraphQL::Schema::Resolver
    # def authorized?(**args)
    #   unless context[:current_user_id].present?
    #     raise GraphQL::ExecutionError.new("login required!!", extensions: {"code" => "UNAUTHENTICATED"})
    #   end
    #
    #   true
    # end
  end
end