import React from "react"
import "./Login.css"
import { Link } from "react-router-dom"
import axios from 'axios'
import urls from "../../constants"

export default function Login() {
    const data={username: "",password: ""}
    const [formData, setFormData] = React.useState(data)
    
    
    
    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }))
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        console.log(formData)
        axios.post(`${urls.backend}/auth/login`,formData,
        {
            headers :{
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }
        ).then((res)=>{
            console.log(res)
            localStorage.setItem("token",res.data.token)
            setFormData(data)
        }).catch((err)=>{
            console.log(err)
        })

        
    }
    
    return (
        <div className="form-container">
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
        </div>
    )
}