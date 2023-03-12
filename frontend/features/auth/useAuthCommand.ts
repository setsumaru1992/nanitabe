import * as z from 'zod';
import { useSignupMutation } from './signUpMutation';

export const SignupSchema = z
  .object({
    email: z.string().min(1, { message: '必須項目です。' }),
    password: z.string().min(6, { message: '6文字以上入力してください。' }),
    passwordConfirmation: z
      .string()
      .min(1, { message: '確認用パスワードを入力してください。' }),
  })
  .superRefine(({ password, passwordConfirmation }, ctx) => {
    if (password !== passwordConfirmation) {
      ctx.addIssue({
        path: ['passwordConfirmation'],
        code: 'custom',
        message: 'パスワードが一致しません',
      });
    }
  });
export type Signup = z.infer<typeof SignupSchema>;

const useSignup = () => {
  const [signupMutation, { loading: signupLoading, error: signupError }] =
    useSignupMutation();
  const signup = async (input: Signup, { onCompleted, onError }) => {
    return signupMutation({
      variables: input,
      onCompleted: async (data) => {
        onCompleted();
      },
      onError: async (error) => {
        onError(error);
      },
    });
  };
  return { signup, signupLoading, signupError };
};

export default () => {
  const { signup, signupLoading, signupError } = useSignup();

  return {
    signup,
    signupLoading,
    signupError,
  };
};
