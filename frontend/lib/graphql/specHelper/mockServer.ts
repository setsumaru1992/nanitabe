import { setupServer } from 'msw/node';
import { graphql } from 'msw';

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
    mutationInterceptor();
    return res(ctx.data(resposeData));
  });
  server.use(handler);

  return { getLatestMutationVariables, mutationInterceptor };
};

export default server;
