import { gql } from '@apollo/client';
import * as z from 'zod';
import {
  useLoginMutation,
  LoginMutation,
} from '../../lib/graphql/generated/graphql';
import { useAccessToken } from './accessTokenAccesser';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    loginUserLogin(email: $email, password: $password) {
      credentials {
        accessToken
        client
        uid
      }
    }
  }
`;

const LoginSchema = z.object({
  email: z.string().min(1, { message: '必須項目です。' }),
  password: z.string().min(1, { message: '必須項目です。' }),
});
export type Login = z.infer<typeof LoginSchema>;

export const useLogin = () => {
  const [loginMutation, { loading: loginLoading, error: loginError }] =
    useLoginMutation();
  const { setAccessToken } = useAccessToken();
  const login = async (input: Login, { onCompleted, onError }) => {
    return loginMutation({
      variables: input,
      onCompleted: async ({
        loginUserLogin: {
          credentials: { accessToken: fetchedAccessToken, client, uid },
        },
      }: LoginMutation) => {
        setAccessToken(fetchedAccessToken, client, uid);
        onCompleted();
      },
      onError: async (error) => {
        onError(error);
      },
    });
  };
  return {
    login,
    loginLoading,
    loginError,
    LoginSchema,
  };
};
