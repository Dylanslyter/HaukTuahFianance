import React, { useState } from 'react';
import {
  Box, Button, FormControl, FormLabel, Input, Heading, List, ListItem, Flex, VStack, Tabs, TabList, TabPanels, Tab, TabPanel, useColorModeValue
} from '@chakra-ui/react';

//importing the assets and liabilities mutations
import { ADD_ASSET_MUTATION, DELETE_ASSET_MUTATION, ADD_LIABILITY_MUTATION, DELETE_LIABILITY_MUTATION, USER_ASSETS_LIABILITIES_QUERY } from '../utils/mutations';
import { useMutation, useQuery } from '@apollo/client';

const AssetsLiabilities = () => {
  // const [assets, setAssets] = useState([]);
  const { data } = useQuery(USER_ASSETS_LIABILITIES_QUERY);
  console.log(data);
  // const [liabilities, setLiabilities] = useState([]);
  const [assetName, setAssetName] = useState('');
  const [assetValue, setAssetValue] = useState('');
  const [liabilityName, setLiabilityName] = useState('');
  const [liabilityValue, setLiabilityValue] = useState('');

  const [addAsset] = useMutation(ADD_ASSET_MUTATION, {
    refetchQueries: [ USER_ASSETS_LIABILITIES_QUERY ],
  });
  const [deleteAsset] = useMutation(DELETE_ASSET_MUTATION,
    { refetchQueries: [ USER_ASSETS_LIABILITIES_QUERY ] }
  );
  const [addLiability] = useMutation(ADD_LIABILITY_MUTATION, {
    refetchQueries: [ USER_ASSETS_LIABILITIES_QUERY ],
  });
  const [deleteLiability] = useMutation(DELETE_LIABILITY_MUTATION, {
    refetchQueries: [ USER_ASSETS_LIABILITIES_QUERY ],
  });

  const assets = data?.listAssetsAndLiabilities.assets || [];
  const liabilities = data?.listAssetsAndLiabilities.liabilities || [];


  const handleAddAsset = async (event) => {
    event.preventDefault();
    if (assetName && assetValue) {
      // setTotal(prevTotal => prevTotal + parseFloat(assetValue));
      const newAsset = {
        _id: new Date().getTime().toString(),
        name: assetName,
        value: parseFloat(assetValue),
      };
      await addAsset({
        variables: { name: assetName, value: newAsset.value, userId: sessionStorage.getItem('token') }});
      // setAssets([...assets, newAsset]);
      setAssetName('');
      setAssetValue('');
    }
  };

  const handleAddLiability = async (event) => {
    event.preventDefault();
    if (liabilityName && liabilityValue) {
      // setTotal(prevTotal => prevTotal - parseFloat(liabilityValue));
      const newLiability = {
        _id: new Date().getTime().toString(),
        name: liabilityName,
        value: parseFloat(liabilityValue),
      };
      await addLiability({
        variables: { name: liabilityName, value: newLiability.value, userId: sessionStorage.getItem('token') }});
      // setLiabilities([...liabilities, newLiability]);
      setLiabilityName('');
      setLiabilityValue('');
    }
    };

  const handleDeleteAsset = (id) => {
    const assetToDelete = assets.find(asset => asset._id === id);
    if (assetToDelete) {
      deleteAsset({ variables: { assetId: id } });
      // setTotal(prevTotal => prevTotal - assetToDelete.value);
      // setAssets(assets.filter(asset => asset._id !== id));
    }
  };

  const handleDeleteLiability = (id) => {
    const liabilityToDelete = liabilities.find(liability => liability._id === id);
    if (liabilityToDelete) {
      deleteLiability({ variables: { liabilityId: id } });
      // setTotal(prevTotal => prevTotal + liabilityToDelete.value);
      // setLiabilities(liabilities.filter(liability => liability._id !== id));
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
                    {/* TODO implement new functions */}
                    <Button colorScheme="red" onClick={() => handleDeleteAsset(asset._id)}>Delete</Button> 
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
                    <Button colorScheme="red" onClick={() => handleDeleteLiability(liability._id)}>Delete</Button> 
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