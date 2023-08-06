import React from 'react'
import { Link } from 'react-router-dom'
import './frontpage.css'

function Frontpage() {
  return (
    <div className='reg'>

        <Link to='/register'><button className='but'>Get Started</button></Link>
      
    </div>
  )
}

export default Frontpage
