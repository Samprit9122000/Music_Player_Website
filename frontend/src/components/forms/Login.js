import React from "react"
import "./Login.css"
import { Link } from "react-router-dom"

export default function Login() {
    const [formData, setFormData] = React.useState({
        email: "",
        password: "",
       
    })
    
    
    
    function handleChange(event) {
        const {name, value, type, checked} = event.target
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: type === "checkbox" ? checked : value
        }))
    }
    
    function handleSubmit(event) {
        event.preventDefault()
        
    }
    
    return (
        <div className="form-container">
            <form className="form" onSubmit={handleSubmit}>
            <h2>User Login</h2>
                <input 
                    type="email" 
                    placeholder="Email address"
                    className="form--input"
                    name="email"
                    onChange={handleChange}
                    value={formData.email}
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