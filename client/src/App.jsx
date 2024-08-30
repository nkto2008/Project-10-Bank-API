import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home';
import SignInPage from './components/SignIn';
import UserPage from './components/User';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/sign-in' element={<SignInPage/>} />
        <Route path='/user' element={<UserPage/>} />
      </Routes>
    </Router>
  );
};

export default App;
