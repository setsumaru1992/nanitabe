import { gql } from '@apollo/client';
import { useSignupMutation } from '../../lib/graphql/generated/graphql';

export const SIGN_UP = gql`
  mutation signup(
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    loginUserRegister(
      email: $email
      password: $password
      passwordConfirmation: $passwordConfirmation
    ) {
      credentials {
        accessToken
      }
    }
  }
`;

export { useSignupMutation };
