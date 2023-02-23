module Types
  class BaseField < GraphQL::Schema::Field
    argument_class Types::BaseArgument
    include GraphqlDevise::FieldAuthentication
  end
end
