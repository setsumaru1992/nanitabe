import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { graphql } from 'msw';
import type { GraphQLHandler, GraphQLRequest } from 'msw';
import { setupServer } from 'msw/node';
import { MockedProvider } from '@apollo/client/testing';
import {
  ApolloProvider,
  ApolloClient,
  createHttpLink,
  InMemoryCache,
} from '@apollo/client';
import fetch from 'isomorphic-unfetch';
import Login from './Login';
import { LoginDocument } from '../../lib/graphql/generated/graphql';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const client = new ApolloClient({
  ssrMode: false,
  link: createHttpLink({
    uri: 'http://localhost',
    credentials: 'same-origin',
    /*
    https://github.com/facebook/jest/issues/10662#issuecomment-1417615125
    記載の通り、isomorphic-unfetchが4系だとjest実行時にSegmentation faultエラーが出るので、3系に下げた
     */
    fetch,
  }),
  cache: new InMemoryCache(),
});

const generateRenderFunction =
  (component: React.ReactNode) =>
  (overrideResponse?: GraphQLHandler<GraphQLRequest<never>>) => {
    if (overrideResponse) {
      server.use(overrideResponse);
    }
    render(<ApolloProvider client={client}>{component}</ApolloProvider>);
  };

const enterTextBox = (screen, testId, value) => {
  fireEvent.change(screen.getByTestId(testId), {
    target: { value },
  });
};

const getLoginMessage = (screen) => screen.getByTestId('loginResultMessage');

const loginSucceededResult = {
  loginUserLogin: {
    credentials: {
      uid: 'hogehoge@gmail.com',
    },
  },
};

describe('<Login>', () => {
  describe('with MockedPrivider, ', () => {
    describe('when login with valid params, ', () => {
      it('succeeds', async () => {
        const validLoginMock = {
          request: {
            query: LoginDocument,
            variables: {
              email: 'hogehoge@gmail.com',
              password: 'hogehoge',
            },
          },
          result: {
            data: loginSucceededResult,
          },
        };
        render(
          <MockedProvider mocks={[validLoginMock]}>
            <Login />
          </MockedProvider>,
        );
        enterTextBox(screen, 'email', 'hogehoge@gmail.com');
        enterTextBox(screen, 'password', 'hogehoge');
        fireEvent.click(screen.getByTestId('loginButton'));

        await waitFor(() => getLoginMessage(screen));
        expect(getLoginMessage(screen)).toHaveTextContent(
          'ログインが成功しました',
        );
      });
    });
  });

  describe('with msw graqhql, ', () => {
    describe('when login with valid params, ', () => {
      const renderComponent = generateRenderFunction(<Login />);

      it('scceeds with expected graphql params', async () => {
        const mutationInterceptor = jest.fn();
        renderComponent(
          graphql.mutation(LoginDocument, (req, res, ctx) => {
            mutationInterceptor(req.variables);
            return res(ctx.data(loginSucceededResult));
          }),
        );

        const email = 'hogehoge@gmail.com';
        enterTextBox(screen, 'email', email);
        const password = 'hogehoge';
        enterTextBox(screen, 'password', password);
        fireEvent.click(screen.getByTestId('loginButton'));

        await waitFor(() => getLoginMessage(screen));

        expect(mutationInterceptor).toHaveBeenCalledWith({
          email,
          password,
        });
        expect(getLoginMessage(screen)).toHaveTextContent(
          'ログインが成功しました',
        );
      });
    });
  });
});
