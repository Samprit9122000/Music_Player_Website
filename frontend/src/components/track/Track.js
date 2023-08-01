import React, { useEffect,useState } from 'react'
import './track.css'
import { useLocation } from 'react-router-dom'
import axios from 'axios'

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




  return (
    <div  className='info'>
      <h1>{song_name}</h1>
      
      <div>
        <span>Name</span><span>{details.song}</span>
      </div>

      <div>
        <span>Name</span><span>Xfcgvvg</span>
      </div>
      <div>
        <span>Name</span><span>Xfcgvvg</span>
      </div>
      <div>
        <span>Name</span><span>Xfcgvvg</span>
      </div>
      <div>
        <span>Namenbjkj</span><span>Xfcgvvg</span>
      </div>
      

    </div>
  )
}

export default Track
