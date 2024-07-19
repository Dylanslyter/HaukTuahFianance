import React, { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Heading, List, ListItem, Flex, VStack, Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue
} from '@chakra-ui/react';

const AssetsLiabilities = ({ total, setTotal, user }) => {
  const [assets, setAssets] = useState([]);
  const [liabilities, setLiabilities] = useState([]);
  const [assetName, setAssetName] = useState('');
  const [assetValue, setAssetValue] = useState('');
  const [liabilityName, setLiabilityName] = useState('');
  const [liabilityValue, setLiabilityValue] = useState('');

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

  return (
    <Box>
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
  );
};

export default AssetsLiabilities;



