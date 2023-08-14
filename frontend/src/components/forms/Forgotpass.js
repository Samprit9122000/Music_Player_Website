import './form.css'
import React, { useState } from 'react'
import axios from 'axios'
import Spinner from '../loader/Spinner'
import { useNavigate } from 'react-router-dom'

function Forgotpass() {
    const [flag1,setFlag1]=useState(true)
    const [flag2,setFlag2]=useState(false)
    const [flag3,setFlag3]=useState(false)
    const [load,setload]=useState(false)
    const [err,setErr]=useState(false)
    const redirect=useNavigate()
    let flag=false
    
    const [data,setData]=useState({
        email:'',
        otp:'',
        pass:'',
        confpass:''
    })
    


    const handleChange=(e)=>{
        setErr(false)

        const name=e.target.name
        const value=e.target.value

        setData((prev)=>{
            return {...prev,[name]:value}
        })


    }

    const emailClick=()=>{
        setload(true)
        axios.put(`http://127.0.0.1:8000/auth/generateOTP`,{
            id:data.email
        }).then((res)=>{
            if(res.status===200){
                setload(false)
                setFlag1(false)
                setFlag2(true)
            }
        }).catch((err)=>{

            alert(err.response.data.detail)
        })


        

    }

    const otpClick=()=>{
        // setload(true)
        axios.post(`http://127.0.0.1:8000/auth/verify/otp/?otp=${data.otp}&emailid=${data.email.replaceAll('@','%40')}`)
        .then((res)=>{
            // setload(false)
            alert(res.data)
            if(res.status===200){
            setFlag2(false)
            setFlag3(true)
            }
        }).catch((err)=>{
            alert(err.response.data.detail)
            
        })



       

    }


   

    const passClick=()=>{
        flag=false
        console.log(data.pass.length<=5,data.pass.search(" ")!==-1,data.pass!==data.confpass)

        if(data.pass.length<=5 || data.pass.search(" ")!==-1 || data.pass!==data.confpass){
            setErr(true)
            flag=true   // using flag because we can not use updated state value inside the same function
        }
       console.log(err)

       if(flag===false){
        // alert("triggered")
        axios.put("http://127.0.0.1:8000/auth/reset/password",{
            emailid:data.email,
            password:data.pass
        }).then((res)=>{
            if(res.status===200){
                alert(res.data)
                redirect('/login')
            }
            

        }).catch((err)=>{
            console.log(err)
        })
        


    }
        
        

    }






  return (
    <div className='reg'>
        {
            load && <Spinner/>

        }

      <div className='forgot'>

        <h2>Forgot Password</h2>
        
      {
        flag1 &&
        <div>
      <input type='email' name='email' placeholder='Email'
      value={data.email} onChange={handleChange} />
      <button className='reset' onClick={emailClick}  style={{marginTop:'1rem'}}>Generate OTP</button>
      </div>

    }

      {
        flag2 &&
        <div>
      <input type='number' name='otp' placeholder='OTP'
      value={data.otp} onChange={handleChange} />
      <button className='reset' onClick={otpClick}  style={{marginTop:'1rem'}}>Verify OTP</button>
      </div>

    } 

    {
        flag3 &&
        
        <div>
        <input type='password' name='pass' placeholder='password'
        value={data.pass} onChange={handleChange} />
        {
        err && 
        <ul style={{color:"red"}}>
            <li>Password must contain 6 characters except space</li>
            <li>Password must be same with confirm password</li>
        </ul>
        }
        {/* {console.log(err)} */}
        <input type='password' name='confpass' placeholder='confirm password'
        value={data.confpass} onChange={handleChange} />
        <button className='reset' onClick={passClick}  style={{marginTop:'1rem'}}>Submit</button>
        </div>

    }

      

     </div>

    </div>
  )
}

export default Forgotpass
