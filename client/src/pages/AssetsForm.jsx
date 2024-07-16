import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, List, ListItem, Flex, VStack, useColorModeValue } from '@chakra-ui/react';

const AssetsForm = () => {
  const [assets, setAssets] = useState([]);
  const [assetName, setAssetName] = useState('');
  const [assetValue, setAssetValue] = useState('');

  const handleAddAsset = (event) => {
    event.preventDefault();

    if (assetName && assetValue) {
      const newAsset = {
        name: assetName,
        value: parseFloat(assetValue),
      };

      setAssets([...assets, newAsset]);
      setAssetName('');
      setAssetValue('');
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
        w="full"
        mx="auto"
        bg={useColorModeValue('purple.300', 'gray.800')}
        borderRadius="lg"
        boxShadow="2xl"
        textAlign="center"
        zIndex="1"
      >
        <Heading mb="6" color={useColorModeValue('teal.500', 'teal.200')}>
          Add Your Assets
        </Heading>
        <form onSubmit={handleAddAsset}>
          <VStack spacing={4}>
            <FormControl id="assetName">
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
            <FormControl id="assetValue">
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
      </Box>
    </Box>
  );
};

export default AssetsForm;





