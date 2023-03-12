import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import style from './Login.module.scss';
import FormFieldWrapperWithLabel from '../common/form/FormFieldWrapperWithLabel';
import useAuthCommand from '../../features/auth/useAuthCommand';
import type { Login } from '../../features/auth/useAuthCommand';

export default (props) => {
  const { login, loginLoading, LoginSchema } = useAuthCommand();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit: SubmitHandler<Login> = async (input) => {
    await login(input, {
      onCompleted: async () => {
        window.alert('ログインが成功しました');
        reset();
      },
      onError: async () => {
        window.alert('ログインに失敗しました');
      },
    });
  };
  return (
    <div className={style['login']}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className={style['login__title']}>ログイン</div>
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
        <Button type="submit" disabled={loginLoading}>
          ログイン
        </Button>
      </Form>
    </div>
  );
};
