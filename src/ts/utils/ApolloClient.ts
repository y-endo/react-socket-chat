import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

export default new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink(),
  defaultOptions: {
    query: {
      fetchPolicy: 'no-cache'
    }
  }
});
