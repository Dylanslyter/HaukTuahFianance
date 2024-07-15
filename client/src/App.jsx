import React from 'react';
import Navbar from './components/Navbar';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import App from './App';

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
