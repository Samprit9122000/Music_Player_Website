import React from 'react'
import Navbar from '../navbar/Navbar'
import Card from '../../card/Card'

function Home() {
  return (
    <div>
      <Navbar/>
      {
        localStorage.getItem('token') 
        ?
        <div className='container'>

          <h1>Welcome</h1>
          <Card/>
          
        </div>
        
        :
        <h3 style={{marginTop:"5rem"}}>You are not authenticated</h3>
      }
    </div>
  )
}

export default Home
