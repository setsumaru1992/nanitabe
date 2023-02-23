import buildApolloClient, { addApolloState } from '../lib/graphql/buildApolloClient'
import { gql } from '@apollo/client';

const IndexPage = (props) => {
  const { hogehoge } = props;
  console.log(hogehoge)
  return (
    <>index</>
  )
}

export async function getStaticProps() {
  const apolloClient = buildApolloClient()

  const query = gql`{testField}`
  const hogehoge = await apolloClient.query({
    query: query,
  })

  return addApolloState(apolloClient, {
    props: {hogehoge},
  })
}

export default IndexPage
