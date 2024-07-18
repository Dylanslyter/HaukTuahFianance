import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, FormControl, FormLabel, Input, Heading, useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';

const DonateForm = () => {
  const [amount, setAmount] = useState(0);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
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
        bg={useColorModeValue('white', 'gray.800')}
        borderRadius="lg"
        boxShadow="2xl"
        textAlign="center"
        zIndex="1"
      >
        <Heading mb="6" color={useColorModeValue('teal.500', 'teal.200')}>
          Donate
        </Heading>
        <form onSubmit={handleSubmit}>
          <FormControl mb="4">
            <FormLabel>Amount</FormLabel>
            <Input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              focusBorderColor="teal.400"
              borderRadius="md"
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
    </Box>
  );
};

export default DonateForm;




  

