import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Heading, List, ListItem, Flex } from '@chakra-ui/react';

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
    <Box maxW="md" mx="auto" p="8" borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Heading mb="6" textAlign="center">Add Your Assets</Heading>
      <form onSubmit={handleAddAsset}>
        <FormControl mb="4">
          <FormLabel>Asset Name</FormLabel>
          <Input
            type="text"
            value={assetName}
            onChange={(e) => setAssetName(e.target.value)}
            placeholder="Enter asset name"
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Asset Value</FormLabel>
          <Input
            type="number"
            value={assetValue}
            onChange={(e) => setAssetValue(e.target.value)}
            placeholder="Enter asset value"
          />
        </FormControl>
        <Button type="submit" colorScheme="teal" isFullWidth>
          Add Asset
        </Button>
      </form>

      <Heading size="md" mt="6" mb="4" textAlign="center">Your Assets</Heading>
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
  );
};

export default AssetsForm;




