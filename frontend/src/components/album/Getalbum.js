import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import Card from '../../card/Card'
import './getalbum.css'

function Getalbum() {
    const params=useParams()
    const {album_id}=params
    const url=`https://api.spotify.com/v1/albums/${album_id}/tracks`
    const location = useLocation()
    const {album_name,image,release}=location.state

    const [songs,setSongs]=useState([])

    useEffect(()=>{
        axios.get(url,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem('token_spotify')
            }
        }).then((res)=>{
            console.log(res)
            setSongs(res.data.items)
        }).catch((err)=>{
            if(err){
                console.log(err)
            }
        })
    },[])






  return (
<div>
        <h2 style={{fontWeight:"bold",paddingTop:"2rem"}}>{album_name}</h2>
        
        <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
            {
                songs.map((item,index)=>{
                    //`https://open.spotify.com/track/${item.id}` - song
                    return <Link to={`/track/${item.id}`} key={index} state={{song_name:item.name,track_id:item.id}}> 
                            <Card name={item.name} image={image} release={release}/> 
                           </Link>
                 })
            }

        </div>



      
    </div>
  )
}

export default Getalbum
