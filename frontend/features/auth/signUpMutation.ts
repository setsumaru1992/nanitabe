import { gql } from '@apollo/client';

// TODO: 今は技術検証中で適当なディレクトリに入れているけど、ゆくゆくはちゃんとモデリングしてそこに入れる
export const SIGN_UP = gql`
  mutation signup(
    $email: String!
    $password: String!
    $passwordConfirmation: String!
  ) {
    loginUserLogin(
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
