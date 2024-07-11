import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import AssetsForm from './components/AssetsForm';
import DonateForm from './components/DonateForm';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/assets" element={<AssetsForm />} />
        <Route path="/donate" element={<DonateForm />} />
      </Routes>
    </>
  );
}

export default App;



