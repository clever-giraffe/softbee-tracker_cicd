import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  ServerError,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';
import { createUploadLink } from 'apollo-upload-client';
import { useLocalStorage } from 'hooks';

const errorLink = onError(({ networkError }) => {
  const [, setJwt] = useLocalStorage('jwt');

  if (networkError && (networkError as ServerError).statusCode === 401) {
    setJwt(null);
  }
});

const authLink = setContext((_, { headers }) => {
  const [jwt] = useLocalStorage('jwt');

  if (jwt !== null) {
    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${jwt}`,
      },
    };
  }

  return {
    headers: {
      ...headers,
    },
  };
});

const httpLink = createUploadLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
});

const link = ApolloLink.from([errorLink, authLink.concat(httpLink)]);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      UsersPermissionsUser: {
        merge: true,
      },
      Tracker: {
        merge: true,
      },
      Project: {
        merge: true,
      },
    },
  }),
});