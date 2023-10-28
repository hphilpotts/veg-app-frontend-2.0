import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import SignIn from './pages/SignIn'

import { nullUser } from './utils/authHelpers'

const App = () => {

  const [user, setUser] = useState(nullUser)
  const signIn = input => setUser(input)

  return (
    <>
      <h1>header</h1>
      <div>
        <Routes>
          <Route path='/' element={<p>Home</p>}></Route>
          <Route path='signin/' element={<SignIn signIn={signIn} />}></Route>
          <Route path='*' element={<p>no match</p>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App