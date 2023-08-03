import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import Home from './components/Home';
import Navbar from './components/Navbar';
// import { useUserContext } from './context/userContext';
import { Toaster } from 'react-hot-toast';

const App = () => {
  // const { loading, error, user } = useUserContext();
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/register' element={<RegistrationForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/resetpassword' element={<ForgotPassword />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;