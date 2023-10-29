import React, { useState, createContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { Header } from './components/Header'

import { SignIn } from './pages/SignIn'

import { nullUser } from './utils/authHelpers'

export const UserContext = createContext()

const App = () => {

  const navigateTo = useNavigate()

  const [user, setUser] = useState(nullUser)

  const signIn = input => { setUser(input), navigateTo('/') }

  const signOut = () => { setUser(nullUser), navigateTo('signin/') }

  return (
    <UserContext.Provider value={user}>
      <Header signOut={signOut} ></Header>
      <div>
        <Routes>
          <Route path='/' element={<p>Home</p>}></Route>
          <Route path='signin/' element={<SignIn signIn={signIn} />}></Route>
          <Route path='*' element={<p>no match</p>}></Route>
        </Routes>
      </div>
    </UserContext.Provider>
  )
}

export default App