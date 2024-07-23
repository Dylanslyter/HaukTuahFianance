import React from 'react';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql';
// Log the configuration to ensure it's read correctly

//needed to create the link to the server
const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT,
});

//needed to add the token to the headers for the server to authenticate the user
const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
function App() {
  return (
    <ApolloProvider client={client}>
      <ChakraProvider>
        <Navbar />
        <Outlet />
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
