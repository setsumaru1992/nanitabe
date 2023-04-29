def fetch_mutation(mutation_string, variables, headers: {})
  post("/graphql", params: { query: mutation_string, variables: }, as: :json, headers:)
  response_body = JSON.parse(response.body)

  if response_body["errors"]
    error_messages = response_body["errors"].map do |error|
      summary = error["message"]
      detail = if error["extensions"].blank?
                 []
               elsif error["extensions"]["detailed_errors"].present? # graphql-deviseエラー
                 error["extensions"]["detailed_errors"]
               elsif error["extensions"]["problems"].present? # 通常のgraphqlエラー
                 error["extensions"]["problems"].map { |problem| problem["explanation"] }
               else
                 []
               end.compact.join(" and ")
      "#{summary} #{detail.present? ? "[detail: #{detail}]" : ''}"
    end
    raise error_messages.join("\n")
  end
  response_body["data"]
end
