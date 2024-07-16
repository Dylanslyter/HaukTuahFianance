import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import DonateForm from './DonateForm';

const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Donate = () => (
  <Elements stripe={stripePromise}>
    <DonateForm />
  </Elements>
);

export default Donate;

