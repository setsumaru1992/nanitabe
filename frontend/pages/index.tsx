import buildApolloClient, { addApolloState } from '../lib/graphql/buildApolloClient'

const IndexPage = () => (
  <>index</>
)

// export async function getStaticProps() {
  // const apolloClient = buildApolloClient()
  //
  // await apolloClient.query({
  //   query: ALL_POSTS_QUERY,
  //   variables: allPostsQueryVars,
  // })
  //
  // return addApolloState(apolloClient, {
  //   props: {},
  //   revalidate: 1,
  // })
// }

export default IndexPage
