import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, List, ListItem, Flex } from '@chakra-ui/react';

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
    <Box maxW="md" mx="auto" p="8" borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Heading mb="6" textAlign="center">Add Your Liabilities</Heading>
      <form onSubmit={handleAddLiability}>
        <FormControl mb="4">
          <FormLabel>Liability Name</FormLabel>
          <Input
            type="text"
            value={liabilityName}
            onChange={(e) => setLiabilityName(e.target.value)}
            placeholder="Enter liability name"
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Liability Value</FormLabel>
          <Input
            type="number"
            value={liabilityValue}
            onChange={(e) => setLiabilityValue(e.target.value)}
            placeholder="Enter liability value"
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" isFullWidth>
          Add Liability
        </Button>
      </form>

      <Heading size="md" mt="6" mb="4" textAlign="center">Your Liabilities</Heading>
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
  );
};

export default LiabilitiesForm;
