import { gql } from '@apollo/client';
import * as z from 'zod';
import { useLoginMutation } from '../../lib/graphql/generated/graphql';

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    loginUserLogin(email: $email, password: $password) {
      credentials {
        accessToken
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
  const login = async (input: Login, { onCompleted, onError }) => {
    return loginMutation({
      variables: input,
      onCompleted: async (data) => {
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
