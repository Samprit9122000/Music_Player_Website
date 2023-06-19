import React from 'react'
import './form.css'
import {useFormik} from 'formik'
import signupschema from '../../schemas/formschema'

const initialvalue={
    username:"",
    email:"",
    password:"",
    confirm_pass:""

}

function Regform() {

    const {values,touched,errors,handleBlur,handleChange,handleSubmit}=useFormik({
        initialValues:initialvalue,
        validationSchema:signupschema,
        onSubmit: (val,action)=>{
            console.log(val)
            action.resetForm()
        }
    })
    // console.log(values)
    // console.log(errors)

  return (
    <div className='reg' onSubmit={handleSubmit}>
      <form>
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

      </form>  

    </div>
  )
}

export default Regform
