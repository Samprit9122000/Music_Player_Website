import React, { useEffect,useState } from 'react'
import Navbar from '../navbar/Navbar'
import jwt from 'jwt-decode'
import './dashboard.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import icon from './remove.png'

function Dashboard() {

  const [data,setData]=useState([])
  const [loggedin,setloggedin]=useState(false)

  let user=''
  if(localStorage.getItem('token')!==null){
    user=jwt(localStorage.getItem("token"))
  }

  // getPlaylist function
  const getPlaylist=async ()=>{
      await axios.get("http://127.0.0.1:8000/playlist/myplaylist",{
        headers:{
          "Authorization":"Bearer "+localStorage.getItem("token")
        }
      }).then((res)=>{
        res.status===200 && setloggedin(true) 
        console.log(res.data.data)
        setData(res.data.data)
      }).catch((err)=>{
        setloggedin(false)
  
      })
  }


  useEffect(()=>{
    getPlaylist()

  },[])


  // delete track from playlist
  const handleClick=async(id)=>{
      // console.log(id)
      await axios.delete(`http://127.0.0.1:8000/playlist/delete/${id}`,{
        headers:{
          "Authorization":"Bearer "+localStorage.getItem("token")
        }
      }).then((res)=>{
        alert(res.data)
        getPlaylist()
      }).catch((err)=>{
        console.log(err)
      })
  }













  return (
    <div>
      {/* <Navbar/> */}
      {
        loggedin
        ?
      <div>
      <h2 style={{textDecoration:"underline",marginBottom:".5rem",paddingTop:"2rem"}}>User Details</h2>
      <h4>{`Name:  ${user.username}`}</h4>
      <h4>{`Email:  ${user.email}`}</h4>
      <div className='playlist'>
        <h4 style={{marginTop:'1rem',textDecoration:'underline'}}>Playlist</h4>

        {
          data.length>0?
       
        // <div className='data'>


        <table class="table table-warning">
          <thead>
            <tr className='table-dark'>
              <th scope="col">#</th>
              <th scope="col">Song</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
    
    
  

          {
            
            data.map((item,index)=>{
              return  <tr key={index} className='table-dark'>
              <td scope="row">{index+1}</td>
              <td><Link to={`/track/${item.trackId}`} className='play' state={{song_name:item.trackName,track_id:item.trackId}}>
                  {item.trackName}
                </Link>
              </td>
              <td><img src={icon} height={18}width={18} alt='delete' onClick={()=>handleClick(item.id)}/></td>
              </tr>
              // <div key={index}>

              //   <div style={{display:"flex",flexDirection:"row",color:"white",justifyContent:"space-between"}}  >
              //   <Link to={`/track/${item.trackId}`} className='play' state={{song_name:item.trackName,track_id:item.trackId}}>
              //     {`${index+1}. `+item.trackName}
              //   </Link>
              //   <img src={icon} height={18}width={18} alt='delete' onClick={()=>handleClick(item.id)}/>
              //   </div>
                

              //   </div>

    
            })
          }
          </tbody>
        </table>
          //  </div> 
          :
          <div style={{marginTop:'5rem'}}>Empty</div>

        }

        
        </div>
        

      </div>
      :

      <h2>Unauthorized user</h2>


        }
    </div>
  )
}

export default Dashboard
