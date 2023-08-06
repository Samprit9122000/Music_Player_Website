import React, { useEffect,useState } from 'react'
import './track.css'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { Link } from 'react-router-dom'

const backend_url="http://127.0.0.1:8000/playlist/add"

function Track() {

    const [details,setDetails] = useState({})
    const location=useLocation()
    const {song_name,track_id} = location.state
    const TRACK_URL = `https://api.spotify.com/v1/tracks/${track_id}`

    useEffect(()=>{
        axios.get(TRACK_URL,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem('token_spotify')
            }
        }).then((res)=>{
            console.log(res)
            const data={
                id:res.data.id,
                song:res.data.name,
                album:res.data.album.name,
                artist:res.data.album.artists[0].name,
                release:res.data.album.release_date,
                image_url:res.data.album.images[0].url,
                duration:res.data.duration_ms,
                preview_url:res.data.preview_url
            }
            setDetails(data)

        }).catch((err)=>{
            if(err){
                console.log(err)
            }
        })
    },[])


    const handleClick=async ()=>{
        const add={
          trackId:details.id,
          trackName:details.song
        }
        await axios.post(backend_url,add,{
          headers:{
            "Authorization":"Bearer "+localStorage.getItem("token")
          }
        }).then((res)=>{
          console.log(res)
          if(res.status==200){
            alert(res.data)
          }
          else{
            alert("Sorry, track is not added")
          }
        }).catch((err)=>{
          if(err){
              console.log(err)
          }
        })
    }




  return (
    <div>
      <h1>{details.song}</h1>
      <img src={details.image_url} height={350} width={300} style={{borderRadius:"15px",marginTop:"2rem"}}/><br/>
      <button className='add' onClick={handleClick}>Add to playlist</button>
    <div  className='info'>
    
      <div className='inner'>

      <div style={{display:"flex",flexDirection:"row",marginBottom:".5rem"}}><span className='left'>Name:</span>    <span className='right'>{details.song}</span><br/></div>
      
      <div style={{display:"flex",flexDirection:"row",marginBottom:".5rem"}}><span className='left'>Album:</span>    <span className='right'>{details.album}</span><br/></div>
      
      <div style={{display:"flex",flexDirection:"row",marginBottom:".5rem"}}><span className='left'>Artist:</span>    <span className='right'>{details.artist}</span><br/></div>
      
      <div style={{display:"flex",flexDirection:"row",marginBottom:".5rem"}}><span className='left'>Release:</span>    <span className='right'>{details.release}</span><br/></div>
      
      <div style={{display:"flex",flexDirection:"row",marginBottom:".5rem"}}><span className='left'>Duration:</span>    <span className='right'>{details.duration+" ms"}</span><br/></div>
      
      <div style={{display:"flex",flexDirection:"row",marginBottom:".5rem"}}><span className='left'>Preview_audio:</span>  
      <span className='right'><audio src={details.preview_url} controls>
      </audio>
      </span>
      <br/>
      </div>
      <br/>
      <a href={`https://open.spotify.com/track/${details.id}`} target='_blank' style={{fontSize:"1.5rem",fontWeight:"bolder",textDecoration:"underline"}}>Click to listen the full song</a>
      


      </div>
      

    </div>

    </div>
  )
}

export default Track
