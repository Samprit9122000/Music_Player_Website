import React, { useEffect, useState } from 'react'
import './homescreen.css'
import axios from 'axios'
import Card from '../../card/Card'
import { Link } from 'react-router-dom'


const artist_urls={
    arijit:"https://api.spotify.com/v1/search?q=Arijit%20Singh&type=artist",
    atif:"https://api.spotify.com/v1/search?q=Atif%20Aslam&type=artist",
    kishore:"https://api.spotify.com/v1/search?q=Kishore%20Kumar&type=artist"
}

function Homescreen({getAlbums}) {

    const [arijit,setArijit]=useState([])    // arijit singh's album
    const [atif,setAtif]=useState([])    // atif aslam's album
    const [kishore,setKishore]=useState([])    // kishore kumar's album
    let counter1,counter2,counter3=0



    useEffect( ()=>{
         axios.get(artist_urls.arijit,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token_spotify")
            }
        })
        .then((res)=>{
            // console.log(res)
            var artist=res.data.artists.items[0].id
            axios.get(`https://api.spotify.com/v1/artists/${artist}/albums`,{
                headers:{
                    "Authorization":"Bearer "+localStorage.getItem('token_spotify')
                }
            }).then((res)=>{
                console.log(res)
                setArijit(res.data.items.slice(0,5))
            }).catch((err)=>{
                if(err){
                    console.log(err)
                }
            })
           
        }).catch((err)=>{
            if(err){
                console.log(err)
            }
        })
    },[])


    useEffect( ()=>{
        axios.get(artist_urls.kishore,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem("token_spotify")
           }
       })
       .then((res)=>{
           // console.log(res)
           var artist=res.data.artists.items[0].id
           axios.get(`https://api.spotify.com/v1/artists/${artist}/albums`,{
               headers:{
                   "Authorization":"Bearer "+localStorage.getItem('token_spotify')
               }
           }).then((res)=>{
               console.log(res)
               setKishore(res.data.items.slice(0,5))
           }).catch((err)=>{
               if(err){
                   console.log(err)
               }
           })
          
       }).catch((err)=>{
           if(err){
               console.log(err)
           }
       })
   },[])


   useEffect( ()=>{
    axios.get(artist_urls.atif,{
       headers:{
           "Authorization":"Bearer "+localStorage.getItem("token_spotify")
       }
   })
   .then((res)=>{
       // console.log(res)
       var artist=res.data.artists.items[0].id
       axios.get(`https://api.spotify.com/v1/artists/${artist}/albums?offset=0&limit=7`,{
           headers:{
               "Authorization":"Bearer "+localStorage.getItem('token_spotify')
           }
       }).then((res)=>{
           console.log(res)
           setAtif(res.data.items)
       }).catch((err)=>{
           if(err){
               console.log(err)
           }
       })
      
   }).catch((err)=>{
       if(err){
           console.log(err)
       }
   })
},[])




  return (
    <div className='homescreen'>


      <h1>Best of Kishore Kumar</h1>
      {/* {console.log(arijit)} */}
      <div className='album'>
      {
        kishore.map((item,index)=>{
            return <Link to={`/album/${item.id}`} state={{album_name:item.name,image:item.images[0].url,release:item.release_date}} key={index}>
                     <Card  name={item.name} image={item.images[0].url} id={item.id} release={item.release_date} type={item.type}/>
                    </Link>
        })
      }
      </div>


      <h1 style={{marginTop:"3rem"}}>Best of Arijit Singh</h1>
      {/* {console.log(arijit)} */}
      <div className='album'>
      {
        arijit.map((item,index)=>{
            return <Link to={`/album/${item.id}`} state={{album_name:item.name,image:item.images[0].url,release:item.release_date}} key={index}>
                     <Card  name={item.name} image={item.images[0].url} id={item.id} release={item.release_date} type={item.type}/>
                    </Link>
        })
      }
      </div>


      <h1 style={{marginTop:"3rem"}}>Best of Atif Aslam</h1>
      {/* {console.log(arijit)} */}
      <div className='album'>
      {
        atif.map((item,index)=>{
            return <Link to={`/album/${item.id}`} state={{album_name:item.name,image:item.images[0].url,release:item.release_date}} key={index}>
                     <Card  name={item.name} image={item.images[0].url} id={item.id} release={item.release_date} type={item.type}/>
                    </Link>
        })
      }
      </div>

     



    </div>
  )
}

export default Homescreen
