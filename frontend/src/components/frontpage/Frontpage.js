import React from 'react'
import { Link } from 'react-router-dom'
import './frontpage.css'

function Frontpage() {
  return (
    <div className='reg'>

        <Link to='/register'><button>Get Started</button></Link>
      
    </div>
  )
}

export default Frontpage
