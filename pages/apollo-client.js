// import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
// var ServerURL = "http://mage.local/graphql";
// export default client = new ApolloClient({
//   uri: ServerURL,
//   headers: {
//     'x-hasura-admin-secret': 'MYADMINSECRETKEY'
//   },
//   cache: new InMemoryCache()
// });

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://countries.trevorblades.com",
  cache: new InMemoryCache(),
});

export default client;


