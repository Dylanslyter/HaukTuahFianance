import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, FormControl, FormLabel, Input, Heading } from '@chakra-ui/react';
import axios from 'axios';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

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
    <Box maxW="md" mx="auto" p="8" borderWidth="1px" borderRadius="lg" boxShadow="lg">
      <Heading mb="6" textAlign="center">Donate</Heading>
      <form onSubmit={handleSubmit}>
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

const Donate = () => (
  <Elements stripe={stripePromise}>
    <DonateForm />
  </Elements>
);

export default DonateForm;
