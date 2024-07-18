import React from 'react';
import { Box, Flex, Heading, Spacer, Button, IconButton } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { FaHome, FaDonate, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  function logout() {}

  return (
    <Box as="nav" p="4" bgGradient="linear(to-r, teal.500, green.500)" color="white" boxShadow="xl">
      <Flex align="center" maxW="1200px" mx="auto">
        <Heading as="h1" size="lg" fontFamily="'Pacifico', cursive" color="white">
          Finance Frenzy
        </Heading>
        <Spacer />
        <Flex>
          <Button
            as={Link}
            to="/"
            variant="ghost"
            mr="4"
            color="white"
            leftIcon={<FaHome />}
            _hover={{ bg: "purple.400", color: "white" }}
          >
            Home
          </Button>
          <Button
            as={Link}
            to="https://donate.stripe.com/7sIcQkbKVckNa2cdQQ"
            variant="ghost"
            mr="4"
            color="white"
            leftIcon={<FaDonate />}
            _hover={{ bg: "purple.400", color: "white" }}
          >
            Donate
          </Button>
          <IconButton
            icon={<FaSignOutAlt />}
            onClick={logout}
            variant="ghost"
            color="white"
            _hover={{ bg: "purple.400", color: "white" }}
            aria-label="Log Out"
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbar;




