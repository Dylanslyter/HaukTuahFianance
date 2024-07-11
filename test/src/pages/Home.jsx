import React from 'react';
import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <Box p="8" maxW="md" mx="auto" borderWidth="1px" borderRadius="lg" boxShadow="lg" textAlign="center">
      <Heading mb="6">Welcome to Net Worth Tracker</Heading>
      <Text mb="4">Track your net worth easily and efficiently.</Text>
      <VStack spacing={4} mt={4}>
        <Button as={Link} to="/signup" colorScheme="teal" size="lg" width="full">
          Sign Up
        </Button>
        <Button as={Link} to="/login" colorScheme="teal" size="lg" width="full">
          Login
        </Button>
      </VStack>
    </Box>
  );
};

export default Home;


