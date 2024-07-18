import React from 'react';
import { Box, Heading, FormControl, FormLabel, Input, Button, VStack, Text, useColorModeValue } from '@chakra-ui/react';

const Signup = () => {
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
        bg={useColorModeValue('purple.300', 'black')}
        borderRadius="lg"
        boxShadow="2xl"
        textAlign="center"
        zIndex="1"
      >
        <Heading mb="6" color={useColorModeValue('teal.500', 'teal.200')}>
          Sign Up
        </Heading>
        <Text mb="6" color={useColorModeValue('gray.600', 'black')}>
          Create an account to get started
        </Text>
        <form>
          <VStack spacing={4}>
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                focusBorderColor="black"
                borderRadius="md"
              />
            </FormControl>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                placeholder="Enter your email"
                focusBorderColor="teal.400"
                borderRadius="md"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                focusBorderColor="teal.400"
                borderRadius="md"
              />
            </FormControl>
            <Button colorScheme="teal" type="submit" width="full" mt="4">
              Sign Up
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;


