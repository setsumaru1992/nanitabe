def fetch_mutation(mutation_string, variables)
  post "/graphql", params: { query: mutation_string, variables: }, as: :json
  response_body = JSON.parse(response.body)

  if response_body["errors"]
    error_messages = response_body["errors"].map { |error| error["message"] }
    raise error_messages.join("\n")
  end
  response_body["data"]
end
