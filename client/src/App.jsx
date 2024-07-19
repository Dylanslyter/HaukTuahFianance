import React from 'react';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

const GRAPHQL_ENDPOINT = import.meta.env.VITE_GRAPHQL_ENDPOINT || 'http://localhost:3000/graphql';
// Log the configuration to ensure it's read correctly


const client = new ApolloClient({
  uri: GRAPHQL_ENDPOINT,
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
