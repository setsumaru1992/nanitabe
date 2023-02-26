import React from 'react';
import { Form, Button } from 'react-bootstrap';
import style from './TempLoginOrRegisterNerUser.module.scss';
import FormFieldWrapperWithLabel from '../common/form/FormFieldWrapperWithLabel';

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

      <div className={style['register-user']}>
        <Form action="">
          <div className={style['register-user__title']}>ユーザ登録</div>
          <FormFieldWrapperWithLabel label="メールアドレス">
            <Form.Control type="email" />
          </FormFieldWrapperWithLabel>
          <FormFieldWrapperWithLabel label="パスワード">
            <Form.Control type="password" />
          </FormFieldWrapperWithLabel>
          <FormFieldWrapperWithLabel label="パスワード確認">
            <Form.Control type="password" />
          </FormFieldWrapperWithLabel>
          <Button type="submit">登録</Button>
        </Form>
      </div>
    </>
  );
};
