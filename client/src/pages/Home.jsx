import React, { useState, useEffect } from 'react';
import { Box, Heading, useColorModeValue } from '@chakra-ui/react';
import AssetsLiabilities from '../components/AssetsLiabilities';
import AuthForm from '../components/AuthForm';

const Home = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  useEffect(() => {
    if (total < 0) {
      setBgImage('/firemoney.jpg');
    } else {
      setBgImage('/backgroundnav.jpg');
    }
  }, [total]);

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setLoggedIn(false);
  };

  if (loggedIn) {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgImage="url('/backgroundnav.jpg')"
        bgSize="cover"
        bgPosition="center"
        position="relative"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.6)"
          zIndex="0"
        />
        <Box
          p="8"
          maxW="md"
          w="full"
          mx="auto"
          bg={useColorModeValue('white', 'gray.800')}
          borderRadius="lg"
          boxShadow="2xl"
          textAlign="center"
          zIndex="1"
        >
          <Heading mb="6" color={useColorModeValue('teal.500', 'teal.200')}>
            Total ${total.toFixed(2)}
          </Heading>
          <AssetsLiabilities total={total} setTotal={setTotal} />
          <Button colorScheme="teal" mt="4" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Box>
    );
  } else {
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-r, teal.500, green.500)"
        position="relative"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="rgba(0, 0, 0, 0.6)"
          zIndex="0"
        />
        <Box
          p="8"
          maxW="md"
          w="full"
          mx="auto"
          bg={useColorModeValue('white', 'gray.800')}
          borderRadius="lg"
          boxShadow="2xl"
          textAlign="center"
          zIndex="1"
        >
          <AuthForm setLoggedIn={setLoggedIn} />
        </Box>
      </Box>
    );
  }
};

export default Home;






