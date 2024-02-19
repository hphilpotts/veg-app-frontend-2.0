import React, { useState, createContext } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { Container } from '@mui/material';

import { Header } from './components/Header';
import { Footer } from './components/Footer';

import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { LogFood } from './pages/LogFood';
import { Progress } from './pages/Progress';

import { nullUser } from './utils/authHelpers';
import { flexColumnCentered as center, topMargin } from '../src/utils/muiTheme';

export const UserContext = createContext();

const App = () => {

  const navigateTo = useNavigate();

  const [user, setUser] = useState(nullUser);

  const setUserFromSignIn = input => { setUser(input), navigateTo('/') };
  const signOut = () => { setUser(nullUser), navigateTo('signin/') };

  return (
    <UserContext.Provider value={user}>
      <Header signOut={signOut} />
      <Container sx={{ ...center, ...topMargin, marginBottom: '15%' }}>
        <Routes>
          <Route path='/' element={<p>Home</p>}></Route>
          <Route path='signin/' element={<SignIn setUserFromSignIn={setUserFromSignIn} />}></Route>
          <Route path='signup/' element={<SignUp setUserFromSignIn={setUserFromSignIn} />}></Route>
          <Route path='logFood/' element={<LogFood />}></Route>
          <Route path='progress/' element={<Progress />}></Route>
          <Route path='*' element={<p>no match</p>}></Route>
        </Routes>
      </Container>
      {user.loggedIn ? <Footer /> : null }
    </UserContext.Provider>
  );
};

export default App;