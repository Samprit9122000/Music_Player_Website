import {React,useState} from 'react'
import './navbar.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import jwt from 'jwt-decode'
import icon from './fabicon.png'


function Navbar({flag,setFlag,search,setSearch,optionChange,handleClick,handleChange}) {
    

    let user=''
    if(localStorage.getItem('token')){
        user = jwt(localStorage.getItem('token'))
    }
    const redirect = useNavigate()

    const logout=()=>{
        localStorage.removeItem('token')
        console.log(localStorage.getItem('token'))
        window.location.reload()
        // redirect('/login')
    }

   












  return (
    <div >
        
        <div className='navbar'>

        
        <ul className='left' style={{float:"left"}}>
            <li><img src={icon} height={35} width={35}/></li>
            <li><NavLink to='/home'>Home</NavLink></li>
            <li><NavLink to='/about'>About Us</NavLink></li>
            <li><NavLink to='/contact'>Contact</NavLink></li>
            
        </ul>

        <ul className='mid'>
            <li>
                <input type='text' name='search' placeholder='search by artist/track' id='searchbar' onChange={handleChange}/>
            </li>
            <li>
                <input type='submit' value='search' id='searchbtn' onClick={handleClick}/>
            </li>
            <li>

            <div className="dropdown" style={{margin:"1rem"}}>
                <select style={{border:"2px solid black",borderRadius:"1rem",background:"black",color:"white"}} onChange={optionChange}>
        
                    <option value='artist'>artist</option>
                    <option value="track">track</option>
        

                </select>

            </div>

            </li>
        </ul>

        <ul className='right'>
        
        {
        localStorage.getItem('token') &&

        <li>

            <div className="dropdown">
                <div className=" dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {user.username}
                    {/* {console.log(user)} */}
                </div>
                <ul className="dropdown-menu">
                    <li><Link to='/dashboard' className="dropdown-item" >dashboard</Link></li>
                    <li>
                        <div className="btn btn-danger dropdown-item" style={{backgroundColor:'red',color:"white"}} onClick={logout}>
                        logout
                        </div>
                    </li>
                </ul>
            </div>

            </li>
            

            

        }

            <li><NavLink to='/register'>Register</NavLink></li>
            <li><NavLink to='/login'>Login</NavLink></li>
            
        </ul>
        </div>

    
      
    </div>
  )
}



export default Navbar
