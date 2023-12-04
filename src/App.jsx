import React, { useState, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { SignIn } from './pages/auth/SignIn';
import { SignUp } from './pages/auth/SignUp';

import { nullUser } from './utils/authHelpers';

export const UserContext = createContext();

const App = () => {

  const navigateTo = useNavigate();

  const [user, setUser] = useState(nullUser);

  const setUserFromSignIn = input => { setUser(input), navigateTo('/') };
  const signOut = () => { setUser(nullUser), navigateTo('signin/') };

  return (
      <UserContext.Provider value={user}>
        <Header signOut={signOut} />
        <Routes>
          <Route path='/' element={<p>Home</p>}></Route>
          <Route path='signin/' element={<SignIn setUserFromSignIn={setUserFromSignIn} />}></Route>
          <Route path='signup/' element={<SignUp setUserFromSignIn={setUserFromSignIn} />}></Route>
          <Route path='*' element={<p>no match</p>}></Route>
        </Routes>
        <Footer />
      </UserContext.Provider>
  );
};

export default App;