import React from 'react'
import { Button } from '@mui/material'

const App = () => {

  const test = () => {
    alert("WHAT DID I SAY")
  }

  return (
    <>
      <Button onClick={test} variant='contained' color='error'>Do not press me</Button>
    </>
  )
}

export default App