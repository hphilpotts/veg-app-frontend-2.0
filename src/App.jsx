import React, { useState } from 'react'
import Axios from 'axios'
import { Routes, Route } from 'react-router-dom'

import SignIn from './pages/SignIn'

const App = () => {

  const [user, setUser] = useState({
    loggedIn: false,
    name: null,
    email: null,
    token: null
  })

  const signInRequest = input => {
    Axios.post('/api/auth/signin', input)
      .then(res => {
        setUser({
          loggedIn: true,
          name: res.data.body.userName,
          email: res.data.body.emailAddress,
          token: res.data.token
        })
      })
      .catch(err => {
        console.error(err)
      })
  }

  return (
    <>
      <h1>header</h1>
      <div>
        <Routes>
          <Route path='/' element={<p>Home</p>}></Route>
          <Route path='signin/' element={<SignIn signInRequest={signInRequest} />}></Route>
          <Route path='*' element={<p>no match</p>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App