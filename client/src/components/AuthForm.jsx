import React, { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Heading, VStack, Tabs, TabList, TabPanels, Tab, TabPanel, Text, useColorModeValue
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION, ADD_USER_MUTATION } from '../utils/mutations';

const AuthForm = ({ setLoggedIn, setUser }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data.login.token) {
        sessionStorage.setItem('token', data.login.token);
        setLoggedIn(true);
      }
    },
    onError: (error) => {
      console.error('Login error:', error);
    },
  });

  const [addUser] = useMutation(ADD_USER_MUTATION, {
    onCompleted: (data) => {
      if (data.addUser.token) {
        sessionStorage.setItem('token', data.addUser.token);
        setLoggedIn(true);
      }
    },
    onError: (error) => {
      console.error('AddUser error:', error);
    },
  });
  

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ variables: { email, password } });
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await addUser({ variables: { username, email, password } });
    } catch (err) {
      console.error('AddUser error:', err);
    }
  };

  return (
    <Box>
      <Heading mb="6" color={useColorModeValue('teal.500', 'teal.200')}>
        Welcome to Net Worth Tracker
      </Heading>
      <Text mb="4" fontSize="lg" color={useColorModeValue('gray.600', 'gray.400')}>
        Track your net worth easily and efficiently.
      </Text>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Sign Up</Tab>
          <Tab>Login</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <form onSubmit={handleAddUser}>
              <VStack spacing={4}>
                <FormControl id="username">
                  <FormLabel>Username</FormLabel>
                  <Input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Enter your username"
                    focusBorderColor="black"
                    borderRadius="md"
                  />
                </FormControl>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                    focusBorderColor="teal.400"
                    borderRadius="md"
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
          </TabPanel>
          <TabPanel>
            <form onSubmit={handleLogin}>
              <VStack spacing={4}>
                <FormControl id="email">
                  <FormLabel>Email address</FormLabel>
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    placeholder="Enter your email"
                    focusBorderColor="teal.400"
                    borderRadius="md"
                  />
                </FormControl>
                <FormControl id="password">
                  <FormLabel>Password</FormLabel>
                  <Input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    placeholder="Enter your password"
                    focusBorderColor="teal.400"
                    borderRadius="md"
                  />
                </FormControl>
                <Button colorScheme="teal" type="submit" width="full" mt="4">
                  Login
                </Button>
              </VStack>
            </form>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AuthForm;

