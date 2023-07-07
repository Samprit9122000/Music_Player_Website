import React, { useState } from 'react'
import './form.css'
import {useFormik} from 'formik'
import signupschema from '../../schemas/formschema'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const initialvalue={
    username:"",
    email:"",
    password:"",
    confirm_pass:""

}

const url="http://127.0.0.1:8000"

function Regform() {

    const redirect = useNavigate()
    const[flag,setFlag]=useState(false)

    const {values,touched,errors,handleBlur,handleChange,handleSubmit}=useFormik({
        initialValues:initialvalue,
        validationSchema:signupschema,
        onSubmit: (val,action)=>{
            // console.log(val)

            axios.post(`${url}/auth/register`,val)
            .then((res)=>{
              console.log(res)
              if(res.status!==210){
                action.resetForm()
                redirect('/login')
              }
              else{
                 setFlag(true) 
              }
            })
            .catch((err)=>{
              if(err!==null)
                console.log(err)
            })

            

        }
    })
    // console.log(values)
    // console.log(errors)

  return (
    <div className='reg' >
      {
        flag ? 

        <div>
          <h1 style={{color:"white"}}>User already exists</h1>
          <Link to='/login'><h4>Go to login page</h4></Link>
        </div> 

        :

      <form onSubmit={handleSubmit}>

        <h2>User Registration</h2>
        
      <input type='text' name='username' placeholder='Username'
      value={values.username} onChange={handleChange} onBlur={handleBlur}/>
      {
        errors.username && touched.username?<p>{errors.username}</p>:null
      }

      <input type='email' name='email' placeholder='Email'
      value={values.email} onChange={handleChange} onBlur={handleBlur}/>
       {
        errors.email && touched.email?<p>{errors.email}</p>:null
      }

      <input type='password' name='password' placeholder='Password'
      value={values.password} onChange={handleChange} onBlur={handleBlur}/>
       {
        errors.password && touched.password?<p>{errors.password}</p>:null
      }

      <input type='password' name='confirm_pass' placeholder='Confirm password'
      value={values.confirm_pass} onChange={handleChange} onBlur={handleBlur}/>
       {
        errors.confirm_pass && touched.confirm_pass?<p>{errors.confirm_pass}</p>:null
      }


      <input type='submit' id='button' value='Register'/>
     <Link to='/login' > <div style={{marginTop:".5rem"}}>Or sign in</div> </Link>


      </form>  

    }

    </div>
  )
}

export default Regform
