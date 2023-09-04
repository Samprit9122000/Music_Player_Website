import {React,useState,useEffect} from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Card from '../../card/Card'
import Spinner from '../loader/Spinner'
import Homescreen from './Homescreen'



const CLIENT_ID="5c0f336fb13d41ef90249d77aa54131c"
const CLIENT_SECRET="c289fe43f0c04f379321652f56c66e80"
const BASE_URL=`https://api.spotify.com/v1/search?`
const data= `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
const authParameters={
  headers:{
      "Content-Type": "application/x-www-form-urlencoded"
  }
  
}

function Home() {
  // const redirect = useNavigate()  /////////////////////////////////////////////////

  // states 
  const [search,setSearch]=useState("")
  const [flag,setFlag]=useState("artist") //track
  const [albums,setalbums]=useState([])
  const [songs,setSongs] = useState([])
  const [loading,setLoading]=useState(false)
  const [clicked,setClicked]=useState(false)

  // URLs
  const SONG_URL=BASE_URL+`q=${search.replaceAll(" ","%20")}&type=track&limit=10`
  const ARTIST_URL=BASE_URL+`q=${search.replaceAll(" ","%20")}&type=artist`

  
  // sort by followers
  const sortByFollowers=(arr)=>{
    let newdata=[]
    let i=0
    console.log("searching for "+search)
    for(i=0;i<arr.length;i++){
    console.log(arr[i])

        if(arr[i].name.toUpperCase()===search.toUpperCase()){
          
          newdata.push(arr[i])
        }
    }
        newdata.sort((a,b)=>{
            if(a.followers.total>b.followers.total){
                return -1;
            }
        })
        console.log(newdata)
        return(newdata)
}

  // Generating spotify authorization token
  useEffect(()=>{
        

        axios.post("https://accounts.spotify.com/api/token",data,authParameters)
        .then((res)=>{
            // console.log(res)
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
    
    setClicked(true)
    console.log("Serachin for "+search)
    if(flag==="artist"){
      setalbums([])
    setLoading(true)    ///////////////////////////////////loading
    axios.get(ARTIST_URL,{
        headers:{
            "Authorization":"Bearer "+localStorage.getItem("token_spotify")
        }
    })
    .then((res)=>{
        // console.log(res)
        var artist_id=sortByFollowers(res.data.artists.items)[0].id
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
        axios.get(SONG_URL,{
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
const getAlbums= (artist)=>{
  console.log(artist)
  axios.get(`https://api.spotify.com/v1/artists/${artist}/albums`,{
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

        clicked ?

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
          <Homescreen getAlbums={getAlbums} data={data} authParameters={authParameters}/>
        
        
        :
        <h3 style={{marginTop:"5rem"}}>You are not authenticated</h3>
      }


      </div>



    </div>
  )
}

export default Home
