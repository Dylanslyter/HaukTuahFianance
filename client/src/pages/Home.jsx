import React from 'react';
import { Box, Heading, Text, Button, VStack, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
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
        bg={useColorModeValue('purple.300', 'gray.800')}
        borderRadius="lg"
        boxShadow="2xl"
        textAlign="center"
        zIndex="1"
      >
        <Heading mb="6" color={useColorModeValue('teal.500', 'teal.200')}>
          Welcome to Net Worth Tracker
        </Heading>
        <Text mb="4" fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
          Track your net worth easily and efficiently.
        </Text>
        <VStack spacing={4} mt={4}>
          <Button as={Link} to="/signup" colorScheme="teal" size="lg" width="full">
            Sign Up
          </Button>
          <Button as={Link} to="/login" colorScheme="teal" size="lg" width="full">
            Login
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};

export default Home;





