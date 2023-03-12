import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthCommand, {
  SignupSchema,
} from '../../features/auth/useAuthCommand';
import type { Signup } from '../../features/auth/useAuthCommand';
import style from './TempLoginOrRegisterNerUser.module.scss';
import FormFieldWrapperWithLabel from '../common/form/FormFieldWrapperWithLabel';

const Signup = () => {
  const { signup, signupLoading } = useAuthCommand();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(SignupSchema),
  });
  const onSubmit: SubmitHandler<Signup> = async (input) => {
    await signup(input, {
      onCompleted: async () => {
        window.alert('ユーザ登録が成功しました');
        reset();
      },
      onError: async () => {
        window.alert('ユーザ登録に失敗しました');
      },
    });
  };

  return (
    <div className={style['register-user']}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className={style['register-user__title']}>ユーザ登録</div>
        <FormFieldWrapperWithLabel label="メールアドレス">
          <Form.Control type="email" {...register('email')} />
          {errors.email?.message && <p>{errors.email.message.toString()}</p>}
        </FormFieldWrapperWithLabel>
        <FormFieldWrapperWithLabel label="パスワード">
          <Form.Control type="password" {...register('password')} />
          {errors.password?.message && (
            <p>{errors.password.message.toString()}</p>
          )}
        </FormFieldWrapperWithLabel>
        <FormFieldWrapperWithLabel label="パスワード確認">
          <Form.Control type="password" {...register('passwordConfirmation')} />
          {errors.passwordConfirmation?.message && (
            <p>{errors.passwordConfirmation.message.toString()}</p>
          )}
        </FormFieldWrapperWithLabel>
        <Button type="submit" disabled={signupLoading}>
          登録
        </Button>
      </Form>
    </div>
  );
};

export default (props) => {
  return (
    <>
      <div className={style['login']}>
        <Form action="">
          <div className={style['login__title']}>ログイン</div>
          <FormFieldWrapperWithLabel label="メールアドレス">
            <Form.Control type="email" />
          </FormFieldWrapperWithLabel>
          <FormFieldWrapperWithLabel label="パスワード">
            <Form.Control type="password" />
          </FormFieldWrapperWithLabel>
          <Button type="submit">ログイン</Button>
        </Form>
      </div>

      <Signup />
    </>
  );
};
