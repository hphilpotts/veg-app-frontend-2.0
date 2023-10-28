import React from 'react'
import { Routes, Route } from 'react-router-dom'

import SignIn from './pages/SignIn'

const App = () => {

  return (
    <>
      <h1>header</h1>
      <div>
        <Routes>
          <Route path='/' element={<p>Home</p>}></Route>
          <Route path='signin/' element={<SignIn/>}></Route>
          <Route path='*' element={<p>no match</p>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App