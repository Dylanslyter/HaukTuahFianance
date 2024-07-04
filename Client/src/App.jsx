import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Box, Flex } from '@chakra-ui/react';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Donate from './components/Donate';
import './App.css';

function App() {
  return (
    <Router>
      <Flex direction="column" minHeight="100vh">
        <Navbar />
        <Box flex="1">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/donate" component={Donate} />
          </Switch>
        </Box>
      </Flex>
    </Router>
  );
}

export default App;
