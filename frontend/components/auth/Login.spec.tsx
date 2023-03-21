import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { MockedProvider } from '@apollo/client/testing';
import Login from './Login';
import { LoginDocument } from '../../lib/graphql/generated/graphql';

const enterTextBox = (screen, testId, value) => {
  fireEvent.change(screen.getByTestId(testId), {
    target: { value },
  });
};

const getLoginMessage = (screen) => screen.getByTestId('loginResultMessage');

describe('<Login>', () => {
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
          data: {
            loginUserLogin: {
              credentials: {
                uid: 'hogehoge@gmail.com',
              },
            },
          },
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

const server = setupServer(
  rest.post('/graphql', (req, res, ctx) => {
    return res(ctx.json({ greeting: 'hello there' }));
  }),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
