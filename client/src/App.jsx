import React from 'react';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <>
      <ChakraProvider>
        <Navbar />
        <Outlet />
      </ChakraProvider>
    </>
  );
}

export default App;
