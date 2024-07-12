import React from 'react';
import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box as="nav" p="4" bg="teal.500" color="white">
      <Flex align="center">
        <Heading as="h1" size="lg">Net Worth Tracker</Heading>
        <Spacer />
        <Button as={Link} to="/" colorScheme="teal" variant="outline" mr="4">Home</Button>
        <Button as={Link} to="/login" colorScheme="teal" variant="outline" mr="4">Login</Button>
        <Button as={Link} to="/signup" colorScheme="teal" variant="outline" mr="4">Sign Up</Button>
        <Button as={Link} to="/assets" colorScheme="teal" variant="outline" mr="4">Assets</Button>
        <Button as={Link} to="/liabilities" colorScheme="teal" variant="outline" mr="4">Liabilities</Button>
        <Button as={Link} to="/donate" colorScheme="teal" variant="outline">Donate</Button>
      </Flex>
    </Box>
  );
};

export default Navbar;

