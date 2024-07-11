import React from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';

const Login = () => {
  return (
    <Box p="8" maxW="md" mx="auto" borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Heading mb="6" textAlign="center">Login</Heading>
      <form>
        <FormControl id="email" mb="4">
          <FormLabel>Email address</FormLabel>
          <Input type="email" placeholder="Enter your email" />
        </FormControl>
        <FormControl id="password" mb="4">
          <FormLabel>Password</FormLabel>
          <Input type="password" placeholder="Enter your password" />
        </FormControl>
        <Button colorScheme="teal" type="submit" width="full" mt="4">Login</Button>
      </form>
    </Box>
  );
};

export default Login;

