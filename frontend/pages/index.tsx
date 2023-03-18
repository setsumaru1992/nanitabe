import { gql } from '@apollo/client';
import type { GetServerSideProps, GetServerSidePropsContext } from 'next';
import buildApolloClient, {
  addApolloState,
} from '../lib/graphql/buildApolloClient';

const IndexPage = (props) => {
  // const { hogehoge } = props;
  // console.log(hogehoge);

  const apolloClient = buildApolloClient();
  const query = gql`
    {
      testField
    }
  `;
  apolloClient
    .query({
      query,
    })
    .then((result) => console.log(result));
  return <>index</>;
};

// export const getServerSideProps: GetServerSideProps = async (
//   context: GetServerSidePropsContext,
// ) => {
//   const apolloClient = buildApolloClient(context);
//
//   const query = gql`
//     {
//       testField
//     }
//   `;
//   const hogehoge = await apolloClient.query({
//     query,
//   });
//
//   return addApolloState(apolloClient, {
//     props: { hogehoge },
//   });
// };

export default IndexPage;
