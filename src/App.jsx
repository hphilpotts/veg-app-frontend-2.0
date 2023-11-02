import React, { useState, createContext } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

import { Header } from './components/Header'

import { SignIn } from './pages/SignIn'
import { SignUp } from './pages/SignUp'
import { FoodIndex } from './pages/FoodIndex'
import { FoodAdd } from './pages/FoodCreate'

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
          <Route path='signup/' element={<SignUp signIn={signIn} />}></Route>
          <Route path='foodIndex/' element={<FoodIndex></FoodIndex>}></Route>
          <Route path='addNewFood/' element={<FoodAdd></FoodAdd>}></Route>
          <Route path='*' element={<p>no match</p>}></Route>
        </Routes>
      </div>
    </UserContext.Provider>
  )
}

export default App