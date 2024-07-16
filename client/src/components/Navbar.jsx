import React from 'react';
import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box as="nav" p="4" bg="teal.500" color="white">
      <Flex align="center">
        <Heading as="h1" size="lg">Finance Frenzy</Heading>
        <Spacer />
        <Button as={Link} to="/" colorScheme="teal" variant="outline" mr="4" bg="#E1BE6A" >Home</Button>
        <Button as={Link} to="/login" colorScheme="teal" variant="outline" mr="4" bg="#E1BE6A">Login</Button>
        <Button as={Link} to="/signup" colorScheme="teal" variant="outline" mr="4" bg="#E1BE6A">Sign Up</Button>
        <Button as={Link} to="/assets" colorScheme="teal" variant="outline" mr="4" bg="#E1BE6A">Assets</Button>
        <Button as={Link} to="/liabilities" colorScheme="teal" variant="outline" mr="4" bg="#E1BE6A">Liabilities</Button>
        <Button as={Link} to="/donate" colorScheme="teal" variant="outline" bg="#E1BE6A">Donate</Button>
      </Flex>
    </Box>
  );
};

export default Navbar;

