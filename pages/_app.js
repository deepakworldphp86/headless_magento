import '../styles/global.css';
import '../styles/bootstrap.min.css';
import '../styles/bootstrap-mega-menu.min.css';
import '../styles/fontawesome/css/all.css';
import "@fortawesome/fontawesome-svg-core/styles.css"; 

import { ApolloClient, ApolloProvider,InMemoryCache } from "@apollo/client";

//Apollo Client 
var ServerURL = "http://mage.local/graphql";
const client = new ApolloClient({
    uri: ServerURL,
    // headers: {
    //   'x-hasura-admin-secret': 'MYADMINSECRETKEY'
    // },
    cache: new InMemoryCache()
  });

export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

