import { ApolloProvider } from '@apollo/client';
import App from 'next/app';
import type { AppProps } from 'next/app';
import { useApollo } from '../lib/graphql/buildApolloClient';
import 'bootstrap/dist/css/bootstrap.min.css';

export const getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};

export default ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps);

  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
};
