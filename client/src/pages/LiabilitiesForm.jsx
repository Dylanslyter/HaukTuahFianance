import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, List, ListItem, Flex, useColorModeValue } from '@chakra-ui/react';

const LiabilitiesForm = () => {
  const [liabilities, setLiabilities] = useState([]);
  const [liabilityName, setLiabilityName] = useState('');
  const [liabilityValue, setLiabilityValue] = useState('');

  const handleAddLiability = (event) => {
    event.preventDefault();

    if (liabilityName && liabilityValue) {
      const newLiability = {
        name: liabilityName,
        value: parseFloat(liabilityValue),
      };

      setLiabilities([...liabilities, newLiability]);
      setLiabilityName('');
      setLiabilityValue('');
    }
  };

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
        bg={useColorModeValue('purple.300', 'gray.800')}
        borderRadius="lg"
        boxShadow="2xl"
        textAlign="center"
        zIndex="1"
      >
        <Heading mb="6" color={useColorModeValue('teal.500', 'teal.200')}>Add Your Liabilities</Heading>
        <form onSubmit={handleAddLiability}>
          <FormControl mb="4">
            <FormLabel>Liability Name</FormLabel>
            <Input type="text" value={liabilityName} onChange={(e) => setLiabilityName(e.target.value)} placeholder="Enter liability name" focusBorderColor="teal.400" borderRadius="md" />
          </FormControl>
          <FormControl mb="4">
            <FormLabel>Liability Value</FormLabel>
            <Input type="number" value={liabilityValue} onChange={(e) => setLiabilityValue(e.target.value)} placeholder="Enter liability value" focusBorderColor="teal.400" borderRadius="md" />
          </FormControl>
          <Button type="submit" colorScheme="teal" width="full" mt="4">Add Liability</Button>
        </form>
        <Heading size="md" mt="6" mb="4" color={useColorModeValue('teal.500', 'teal.200')}>Your Liabilities</Heading>
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
      </Box>
    </Box>
  );
};

export default LiabilitiesForm;

