def fetch_mutation(mutation_string, variables)
  post "/graphql", params: { query: mutation_string, variables: }
  response_body = JSON.parse(response.body)
  response_body["data"]
end
