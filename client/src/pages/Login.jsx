import React from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, VStack, Text, Link, useColorModeValue } from '@chakra-ui/react';

const Login = () => {
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
        mx="auto"
        bg={useColorModeValue('white', 'gray.800')}
        borderRadius="lg"
        boxShadow="2xl"
        textAlign="center"
        zIndex="1"
      >
        <Heading mb="6" color={useColorModeValue('teal.500', 'teal.200')}>Login</Heading>
        <form>
          <VStack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input type="email" placeholder="Enter your email" focusBorderColor="teal.400" borderRadius="md" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Enter your password" focusBorderColor="teal.400" borderRadius="md" />
            </FormControl>
            <Button colorScheme="teal" type="submit" width="full" mt="4">Login</Button>
          </VStack>
        </form>
        <Text mt="4" textAlign="center" color={useColorModeValue('gray.600', 'gray.400')}>
          Don't have an account?{' '}
          <Link href="/signup" color={useColorModeValue('teal.500', 'teal.300')}>Sign Up</Link>
        </Text>
      </Box>
    </Box>
  );
};

export default Login;



