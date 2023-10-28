import React, { useEffect } from 'react'
import Axios from 'axios'

export default function AxiosTest() {

  const testLocalConnection = () => {
    Axios.get("/api/foodItem/index")
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.error(err)
    })
  }

  useEffect(() => {
    testLocalConnection()
  })

  return (
    <div>AxiosTest</div>
  )
}
