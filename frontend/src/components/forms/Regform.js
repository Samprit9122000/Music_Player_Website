import React from 'react'
import './form.css'

function Regform() {
  return (
    <div className='reg'>
      <form>
        <h2>User Registration</h2>
      <input type='text' name='username' placeholder='Username'/>
      <input type='email' name='email' placeholder='Email'/>
      <input type='password' name='password' placeholder='Password'/>
      <input type='password' name='confirm_pass' placeholder='Confirm password'/>
      <button>Submit</button>
      </form>  

    </div>
  )
}

export default Regform
