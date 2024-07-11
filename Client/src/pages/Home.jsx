import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';

const Home = () => {
  return (
    <Box p="8" maxW="md" mx="auto" borderWidth="1px" borderRadius="lg" boxShadow="lg" textAlign="center">
      <Heading mb="6">Welcome to Net Worth Tracker</Heading>
      <Text mb="4">Track your net worth easily and efficiently.</Text>
      <Button colorScheme="teal" size="lg" mt="4">
        Get Started
      </Button>
    </Box>
  );
};

export default Home;

