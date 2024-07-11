import React from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const Signup = () => {
  return (
    <Box p="8" maxW="md" mx="auto" borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Heading mb="6" textAlign="center">Sign Up</Heading>
      <form>
        <FormControl id="username" mb="4">
          <FormLabel>Username</FormLabel>
          <Input type="text" placeholder="Enter your username" />
        </FormControl>
        <FormControl id="email" mb="4">
          <FormLabel>Email address</FormLabel>
          <Input type="email" placeholder="Enter your email" />
        </FormControl>
        <FormControl id="password" mb="4">
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" />
        </FormControl>
        <Button colorScheme="teal" type="submit" width="full" mt="4">Sign Up</Button>
      </form>
    </Box>
  );
};

export default Signup;

