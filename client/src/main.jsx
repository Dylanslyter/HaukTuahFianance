// dependencies
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';

// pages
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import AssetsForm from './pages/AssetsForm.jsx';
import DonateForm from './pages/DonateForm.jsx';
import LiabilitiesForm from './pages/LiabilitiesForm.jsx';
import Donate from './pages/Donate.jsx';


// router
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'signup',
        element: <Signup />,
      },
      { path: 'assets', 
      element: <AssetsForm /> },

      { path: 'donate',
      element: <DonateForm /> },
      
      { path: 'liabilities',
      element: <LiabilitiesForm /> },

      {path: 'donate',
      element: <Donate />},
    ],
  },
]);

// rendering the router
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
