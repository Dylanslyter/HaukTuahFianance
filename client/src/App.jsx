import React, { useState, useEffect } from 'react';
import ReactLoading from "react-loading";
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time for demonstration purposes
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the loading time as needed
  }, []);

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <h2>Fianace Frenzy Loading...</h2>
        <ReactLoading
          type="spinningBubbles"
          color="teal"
          height={500}
          width={250}
        />
      </div>
    );
  }

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
