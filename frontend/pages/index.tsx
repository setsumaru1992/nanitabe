import { gql } from '@apollo/client';
import buildApolloClient, {
  addApolloState,
} from '../lib/graphql/buildApolloClient';

const IndexPage = (props) => {
  const apolloClient = buildApolloClient();
  // const { hogehoge } = props;
  // console.log(hogehoge);
  const query = gql`
    {
      testField
    }
  `;
  const hogehoge = apolloClient
    .query({
      query,
    })
    .then((result) => console.log(result));
  return <>index</>;
};

// export async function getStaticProps(context) {
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
// }

export default IndexPage;
