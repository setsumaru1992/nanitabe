def fetch_mutation(mutation_string, variables, headers: {})
  post("/graphql", params: { query: mutation_string, variables: }, as: :json, headers:)
  response_body = JSON.parse(response.body)

  if response_body["errors"]
    error_messages = response_body["errors"].map do |error|
      decorate_error_message(error["message"], build_error_detail_message(error))
    end
    raise decorate_error_messages(error_messages, variables)
  end

  response_body["data"]
end

def build_error_detail_message(graphql_error)
  detail_messages = if graphql_error["extensions"].blank?
                      []
                    elsif graphql_error["extensions"]["detailed_errors"].present? # graphql-deviseエラー
                      graphql_error["extensions"]["detailed_errors"]
                    elsif graphql_error["extensions"]["problems"].present? # 通常のgraphqlエラー
                      graphql_error["extensions"]["problems"].map { |problem| problem["explanation"] }
                    else
                      []
                    end
  detail_messages.compact.join(" and ")
end

def decorate_error_message(summary, detail)
  message = summary
  if detail.present?
    message << "\n  #{detail}"
  end
  message
end

def decorate_error_messages(error_messages, variables)
  result = error_messages.join("\n")
  result << "\n\nvariables: #{variables}"
  result
end
