import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
var ServerURL = "http://mage.local/graphql";
// const client = new ApolloClient({
//     uri: ServerURL,
//     headers: {
//       'x-hasura-admin-secret': 'MYADMINSECRETKEY'
//     },
//     cache: new InMemoryCache()
//   });

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
});

export default client;

