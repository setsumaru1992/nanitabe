import { setupServer } from 'msw/node';
import { graphql, HttpResponse } from 'msw';

const server = setupServer();

export const registerMutationHandler = (mutationDocument, resposeData) => {
  const execVariables = [];
  const getLatestMutationVariables = () => {
    if (execVariables.length === 0) return null;
    return execVariables[execVariables.length - 1];
  };

  const mutationInterceptor = jest.fn();
  const handler = graphql.mutation(mutationDocument, (req, res, ctx) => {
    execVariables.push(req.variables);
    return res(ctx.data(resposeData));
  });
  server.use(handler);

  return { getLatestMutationVariables, mutationInterceptor };
};

/*
  resposeDataについての注意事項
  - 本番が返すような`__typename`がないとそのオブジェクトの中身が空としてしか認識されない
  - nullableな値であっても定義はしておかないと長々とした警告メッセージが出る
 */
export const registerQueryHandler = (queryDocument, resposeData) => {
  const execVariables = [];
  const getLatestQueryVariables = () => {
    if (execVariables.length === 0) return null;
    return execVariables[execVariables.length - 1];
  };

  const queryInterceptor = jest.fn();
  const handler = graphql.query(queryDocument, (req, res, ctx) => {
    execVariables.push(req.variables);
    return res(ctx.data(resposeData));
  });
  server.use(handler);

  return { getLatestQueryVariables, queryInterceptor };
};

export default server;
