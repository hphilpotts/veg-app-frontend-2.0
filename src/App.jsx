import React from 'react'
import { Routes, Route } from 'react-router-dom'

const App = () => {

  return (
    <>
      <h1>header</h1>
      <div>
        <Routes>
          <Route path='/' element={<p>Home</p>}></Route>
          <Route path='about/' element={<p>About</p>}></Route>
          <Route path='*' element={<p>no match</p>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App