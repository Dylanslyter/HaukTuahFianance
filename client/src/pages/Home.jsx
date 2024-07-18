import React, { useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import {
  Box, Button, FormControl, FormLabel, Input, Heading, List, ListItem, Flex, VStack, useColorModeValue, Tabs, TabList, TabPanels, Tab, TabPanel, Text
} from '@chakra-ui/react';
import { useMutation } from '@apollo/client';
import { LOGIN_MUTATION, ADD_USER_MUTATION } from '../utils/mutations';

const Home = () => {
  const [assets, setAssets] = useState([]);
  const [liabilities, setLiabilities] = useState([]);
  const [assetName, setAssetName] = useState('');
  const [assetValue, setAssetValue] = useState('');
  const [liabilityName, setLiabilityName] = useState('');
  const [liabilityValue, setLiabilityValue] = useState('');
  const [bgImage, setBgImage] = useState('/backgroundnav.jpg');
  const [loggedIn, setLoggedIn] = useState(false);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [login, { data: loginData, loading: loginLoading, error: loginError }] = useMutation(LOGIN_MUTATION, {
    onCompleted: (data) => {
      if (data.login.token) {
        sessionStorage.setItem('token', data.login.token); // Save token to session storage
        setLoggedIn(true); // Set loggedIn to true after successful login
      }
    },
    onError: (error) => {
      console.error('Login error:', error); // Error handling for login
    },
  });
  const [addUser, { data: addUserData, loading: addUserLoading, error: addUserError }] = useMutation(ADD_USER_MUTATION, {
    onCompleted: (data) => {
      if (data.addUser.token) {
        sessionStorage.setItem('token', data.addUser.token); // Save token to session storage
        setLoggedIn(true); // Set loggedIn to true after successful registration
      }
    },
    onError: (error) => {
      console.error('AddUser error:', error); // Error handling for registration
    },
  });
  const [total, setTotal] = useState(0);

  // Check for token in session storage when component mounts
  useEffect(() => {
    const token = sessionStorage.getItem('token');
    if (token) {
      setLoggedIn(true); // Set loggedIn to true if token exists
    }
  }, []);
  
  const handleLogin = async () => {
    try {
      await login({ variables: { email, password } }); // Call login mutation
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  const handleAddUser = async () => {
    try {
      await addUser({ variables: { username, email, password } }); // Call addUser mutation
    } catch (err) {
      console.error('AddUser error:', err);
    }
  };
  const handleLogout = () => {
    sessionStorage.removeItem('token');
    setLoggedIn(false); // Set loggedIn to false after logout
  };
  const handleAddAsset = (event) => {
    event.preventDefault();
    if (assetName && assetValue) {
      setTotal(prevTotal => prevTotal + parseFloat(assetValue));
      const newAsset = {
        name: assetName,
        value: parseFloat(assetValue),
      };
      setAssets([...assets, newAsset]);
      setAssetName('');
      setAssetValue('');
    }
  };

  const handleAddLiability = (event) => {
    event.preventDefault();
    if (liabilityName && liabilityValue) {
      setTotal(prevTotal => prevTotal - parseFloat(liabilityValue));
      const newLiability = {
        name: liabilityName,
        value: parseFloat(liabilityValue),
      };
      setLiabilities([...liabilities, newLiability]);
      setLiabilityName('');
      setLiabilityValue('');
    }
  };
  useEffect(() => {
    // Update bgImage whenever total changes
    if (total < 0) {
      setBgImage('/firemoney.jpg');
    } else {
      setBgImage('/backgroundnav.jpg');
    }
  }, [total]);
  if (loggedIn) { 
    return (
      <Box
        minH="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
        bgImage="url('/backgroundnav.jpg')" // Reference the image in the public folder
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
        <Tabs isFitted variant="enclosed">
          <TabList mb="1em">
            <Tab>Assets</Tab>
            <Tab>Liabilities</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Heading mb="6" color={useColorModeValue('teal.500', 'teal.200')}>
                Add Your Assets
              </Heading>
              <form onSubmit={handleAddAsset}>
                <VStack spacing={4}>
                  <FormControl id="assetName" isRequired>
                    <FormLabel>Asset Name</FormLabel>
                    <Input
                      type="text"
                      value={assetName}
                      onChange={(e) => setAssetName(e.target.value)}
                      placeholder="Enter asset name"
                      focusBorderColor="teal.400"
                      borderRadius="md"
                    />
                  </FormControl>
                  <FormControl id="assetValue" isRequired>
                    <FormLabel>Asset Value</FormLabel>
                    <Input
                      type="number"
                      value={assetValue}
                      onChange={(e) => setAssetValue(e.target.value)}
                      placeholder="Enter asset value"
                      focusBorderColor="teal.400"
                      borderRadius="md"
                    />
                  </FormControl>
                  <Button type="submit" colorScheme="teal" width="full" mt="4">
                    Add Asset
                  </Button>
                </VStack>
              </form>

              <Heading size="md" mt="6" mb="4" color={useColorModeValue('teal.500', 'teal.200')}>
                Your Assets
              </Heading>
              <List spacing={3}>
                {assets.map((asset, index) => (
                  <ListItem key={index} p="4" borderWidth="1px" borderRadius="lg">
                    <Flex justify="space-between">
                      <span>{asset.name}</span>
                      <span>${asset.value.toFixed(2)}</span>
                    </Flex>
                  </ListItem>
                ))}
              </List>
            </TabPanel>
            <TabPanel>
              <Heading mb="6" color={useColorModeValue('teal.500', 'teal.200')}>
                Add Your Liabilities
              </Heading>
              <form onSubmit={handleAddLiability}>
                <VStack spacing={4}>
                  <FormControl id="liabilityName" isRequired>
                    <FormLabel>Liability Name</FormLabel>
                    <Input
                      type="text"
                      value={liabilityName}
                      onChange={(e) => setLiabilityName(e.target.value)}
                      placeholder="Enter liability name"
                      focusBorderColor="teal.400"
                      borderRadius="md"
                    />
                  </FormControl>
                  <FormControl id="liabilityValue" isRequired>
                    <FormLabel>Liability Value</FormLabel>
                    <Input
                      type="number"
                      value={liabilityValue}
                      onChange={(e) => setLiabilityValue(e.target.value)}
                      placeholder="Enter liability value"
                      focusBorderColor="teal.400"
                      borderRadius="md"
                    />
                  </FormControl>
                  <Button type="submit" colorScheme="teal" width="full" mt="4">
                    Add Liability
                  </Button>
                </VStack>
              </form>

              <Heading size="md" mt="6" mb="4" color={useColorModeValue('teal.500', 'teal.200')}>
                Your Liabilities
              </Heading>
              <List spacing={3}>
                {liabilities.map((liability, index) => (
                  <ListItem key={index} p="4" borderWidth="1px" borderRadius="lg">
                    <Flex justify="space-between">
                      <span>{liability.name}</span>
                      <span>${liability.value.toFixed(2)}</span>
                    </Flex>
                  </ListItem>
                ))}
              </List>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>)
  } else {  //login form appears here
    return ( <Box 
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
          <form>
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
            <Button colorScheme="teal" onClick={handleAddUser}  width="full" mt="4">
              Sign Up
            </Button>
          </VStack>
        </form>
            </TabPanel>
            <TabPanel>
          <form>
          <VStack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email" 
              placeholder="Enter your email" 
              focusBorderColor="teal.400" 
              borderRadius="md" />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password" 
              placeholder="Enter your password" 
              focusBorderColor="teal.400" 
              borderRadius="md" />
            </FormControl>
            <Button colorScheme="teal" onClick={handleLogin} type="submit" width="full" mt="4">Login</Button>
          </VStack>
        </form>
            </TabPanel>
            </TabPanels>
          </Tabs>
          
      
        <VStack spacing={4} mt={4}>
        </VStack>
      </Box>
  </Box> )
  }
};

export default Home;





