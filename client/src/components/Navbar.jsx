import React from 'react';
import { Box, Flex, Heading, Spacer, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <Box as="nav" p="4" bg="teal.500" color="white" boxShadow="md">
      <Flex align="center">
        <Heading as="h1" size="lg" fontFamily="'Pacifico', cursive" color="purple.300">
          Finance Frenzy
        </Heading>
        <Spacer />
        <Flex>
          <Button
            as={Link}
            to="/"
            variant="solid"
            mr="4"
            bg="purple.300"
            color="black"
            _hover={{ bg: "purple.400", color: "white" }}
          >
            Home
          </Button>
          <Button
            as={Link}
            to="/donate"
            variant="solid"
            bg="purple.300"
            color="black"
            _hover={{ bg: "purple.400", color: "white" }}
          >
            Donate
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;



