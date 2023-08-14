import React, { useState } from "react"
import "./Login.css"
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import urls from "../../constants"



export default function Login() {
    const data={username: "",password: ""}
    const [status,setStatus]=useState(false)
    const [formData, setFormData] = React.useState(data)
    const redirect = useNavigate()
    
    
    
    function handleChange(event) {
        setStatus(false)
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }))
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        // console.log(formData)
        axios.post(`${urls.backend}/auth/login`,formData,
        {
            headers :{
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }
        ).then((res)=>{
            console.log(res)
            if(res.status===200){
                setStatus(false)

            }
            localStorage.setItem("token",res.data.token)
            setFormData(data)
            redirect('/home')

        }).catch((err)=>{
             if(err.response.status===404){

                 setStatus(true)
             }
            console.log(err)
        })

        
    }



    
    return (
        <div className="form-container">
            {status && <h1 style={{color:"white"}}>Invalid user</h1>}
            <form className="form" onSubmit={handleSubmit}>
            <h2 style={{color:"white"}}>User Login</h2>
                <input 
                    type="email" 
                    placeholder="Email address"
                    className="form--input"
                    name="username"
                    onChange={handleChange}
                    value={formData.username}
                    required
                />
                <input 
                    type="password" 
                    placeholder="Password"
                    className="form--input"
                    name="password"
                    onChange={handleChange}
                    value={formData.password}
                    required
                />
                                
                <button 
                    className="form--submit"
                >
                    Log In
                </button>
                <Link to='/register' > <div style={{marginTop:".5rem"}}>Or Register</div> </Link>
            
            </form>

            <Link to='/forgot-password' >
            <button className="reset">forgot password</button>
            </Link>


        </div>
    )
}