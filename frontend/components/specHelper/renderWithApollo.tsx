import {ApolloClient, ApolloProvider, createHttpLink, InMemoryCache} from "@apollo/client";
import fetch from "isomorphic-unfetch";
import React from "react";
import {render} from "@testing-library/react";

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
export default (component: React.ReactNode) => {
    render(<ApolloProvider client={client}>{component}</ApolloProvider>);
}
