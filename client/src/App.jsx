import React from 'react';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';


function App() {
  const [loggedIn, setLoggedIn] = useState(false); // State to manage logged-in status
  const [user, setUser] = useState(null); // State to store user information
 
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Navbar />
        <Box p={4}>
          {loggedIn && user ? ( // Check if user is logged in
            <Text>Welcome, {user.username}!</Text> // Display username if logged in
          ) : (
            <Outlet context={{ setLoggedIn, setUser }} /> // Pass setLoggedIn and setUser to Outlet
          )}
        </Box>
      </ApolloProvider>
    </ChakraProvider>
  );
}

export default App;
