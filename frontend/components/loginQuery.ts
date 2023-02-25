import { gql } from '@apollo/client';

// TODO: 今は技術検証中で適当なディレクトリに入れているけど、ゆくゆくはちゃんとモデリングしてそこに入れる
export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    loginUserLogin(email: $email, password: $password){
      credentials {
        accessToken
      }
    }
  }
`;