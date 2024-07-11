import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, FormControl, FormLabel, Input, Heading, List, ListItem, Flex } from '@chakra-ui/react';
import axios from 'axios';

const stripePromise = loadStripe('your-publishable-key-here');

const AssetsAndDonateForm = () => {
  const [assets, setAssets] = useState([]);
  const [assetName, setAssetName] = useState('');
  const [assetValue, setAssetValue] = useState('');
  const [amount, setAmount] = useState(0);
  const stripe = useStripe();
  const elements = useElements();

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

  const handleSubmitDonation = async (event) => {
    event.preventDefault();

    const { data } = await axios.post('/create-payment-intent', { amount: amount * 100 });

    const clientSecret = data.clientSecret;
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: 'Donor Name',
        },
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      if (result.paymentIntent.status === 'succeeded') {
        console.log('Donation successful!');
      }
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

      <Heading mt="8" mb="6" textAlign="center">Donate</Heading>
      <form onSubmit={handleSubmitDonation}>
        <FormControl mb="4">
          <FormLabel>Amount</FormLabel>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
        </FormControl>
        <FormControl mb="4">
          <FormLabel>Card Details</FormLabel>
          <CardElement />
        </FormControl>
        <Button type="submit" mt="4" colorScheme="teal" isFullWidth>
          Donate
        </Button>
      </form>
    </Box>
  );
};

const AssetsAndDonate = () => (
  <Elements stripe={stripePromise}>
    <AssetsAndDonateForm />
  </Elements>
);

export default AssetsAndDonate;



