import React from 'react'
import { Routes, Route } from 'react-router-dom'

import AxiosTest from './pages/AxiosTest'

const App = () => {

  return (
    <>
      <h1>header</h1>
      <div>
        <Routes>
          <Route path='/' element={<p>Home</p>}></Route>
          <Route path='test/' element={<AxiosTest/>}></Route>
          <Route path='*' element={<p>no match</p>}></Route>
        </Routes>
      </div>
    </>
  )
}

export default App