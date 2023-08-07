import {React,useState,useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Card from '../../card/Card'
import Spinner from '../loader/Spinner'



const CLIENT_ID="5c0f336fb13d41ef90249d77aa54131c"
const CLIENT_SECRET="c289fe43f0c04f379321652f56c66e80"
const BASE_URL=`https://api.spotify.com/v1/search?`


function Home() {
  const redirect = useNavigate()  /////////////////////////////////////////////////

  // states 
  const [search,setSearch]=useState("")
  const [flag,setFlag]=useState("artist") //track
  const [albums,setalbums]=useState([])
  const [songs,setSongs] = useState([])
  const [loading,setLoading]=useState(false)

  // URLs
  const SONG_URL=BASE_URL+`q=${search.replaceAll(" ","%20")}&type=track&limit=10`
  const ARTIST_URL=BASE_URL+`q=${search.replaceAll(" ","%20")}&type=artist`

  // Generating spotify authorization token
  useEffect(()=>{
        
    const authParameters={
        headers:{
            "Content-Type": "application/x-www-form-urlencoded"
        }
        
    }
    const data= `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`

        axios.post("https://accounts.spotify.com/api/token",data,authParameters)
        .then((res)=>{
            // console.log(typeof(res.data.access_token))
            localStorage.setItem('token_spotify',res.data.access_token)  
        })
        .catch((err)=>{
            if(err){
                console.log(err)
            }
        })

    },[])


  //handleChange method
  const handleChange=(e)=>{
    setSearch(e.target.value)

}  

  // onClick Method
  const handleClick=async (e)=>{
    redirect('/home')
    console.log("Serachin for "+search)
    if(flag==="artist"){
      setalbums([])
    setLoading(true)    ///////////////////////////////////loading
    await axios.get(ARTIST_URL,{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("token_spotify")
        }
    })
    .then((res)=>{
        // console.log(res)
        var artist_id=res.data.artists.items[0].id
        getAlbums(artist_id)
        setLoading(false)   ////////////////////////////////////loading
    }).catch((err)=>{
        if(err){
            console.log(err)
        }
    })

    }

    else{
        console.log("song:"+search)
        setSongs([])
        setLoading(true)             //////////////////////////////////////// loading
        await axios.get(SONG_URL,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("token_spotify")
            }
        })
        .then((res)=>{
            const data=res.data.tracks.items
            console.log(data)
            setSongs(data)
           
        }).catch((err)=>{
            if(err){
                console.log(err)
            }
        })
        setLoading(false) /////////////////////////////////////////////loading
    }

}



// getAlbums method
const getAlbums=async (artist)=>{
  console.log(artist)
  await axios.get(`https://api.spotify.com/v1/artists/${artist}/albums`,{
      headers:{
          "Authorization":"Bearer "+localStorage.getItem('token_spotify')
      }
  }).then((res)=>{
      console.log(res)
      setalbums(res.data.items)
  }).catch((err)=>{
      if(err){
          console.log(err)
      }
  })
}

  // optionChange
   const optionChange=(e)=>{
    setalbums([])
    setSongs([])
    setFlag(e.target.value)
}







  return (

    <div >
      <Navbar search={search} flag={flag} setFlag={setFlag} setSearch={setSearch} optionChange={optionChange} handleChange={handleChange} handleClick={handleClick}/>
        {loading && <Spinner />}
      <div style={{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
      {
        localStorage.getItem('token') 
        ?
          // clicked
          flag==="artist"
          ?
          albums.map((item,index)=>{
            return <Link to={`/album/${item.id}`} state={{album_name:item.name,image:item.images[0].url,release:item.release_date}} key={index}>
                    <Card  name={item.name} image={item.images[0].url} id={item.id} release={item.release_date} type={item.type}/>
                  </Link>
          })
          :
          
              
          songs.map((item,index)=>{
              return <Link to={`/track/${item.id}`} key={index} state={{song_name:item.name,track_id:item.id}} >
                      <Card name={item.name} image={item.album.images[0].url} id={item.id} release={item.album.release_date} type={item.type} />
                    </Link>
  
                  })
              
          // clicked
        
        
        :
        <h3 style={{marginTop:"5rem"}}>You are not authenticated</h3>
      }


      </div>
      
    </div>
  )
}

export default Home
