import {setupServer} from "msw/node";
import {graphql} from "msw";

export const registerMutationHandler = (mutation, resposeData) => {
    const execVariables = []
    const getLatestMutationVariables = () => {
        if (execVariables.length === 0) return null;
        return execVariables[execVariables.length - 1];
    }

    const handler = graphql.mutation(mutation, (req, res, ctx) => {
        execVariables.push(req.variables);
        return res(ctx.data(resposeData));
    });
    server.use(handler);

    return {getLatestMutationVariables};
}

const server = setupServer();
export default server;
