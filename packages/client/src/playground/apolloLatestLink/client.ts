import {ApolloClient, from, HttpLink, InMemoryCache} from '@apollo/client';
import isLatestLink from './IsLatestLink';

const client = () =>new ApolloClient({
  link: from([
    isLatestLink.use(),
    new HttpLink({uri: 'http://localhost:4000'})
  ]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Necessary because GetFirst caches a "null" with no type name.
          number: {
            read(_obj, {args, toReference}) {
              return toReference({
                __typename: 'Number',
                id: args.id
              });
            }
          }
        }
      }
    }
  }),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only'
    }
  }
});

export default client;
