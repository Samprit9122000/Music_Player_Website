import React from 'react'
import { Link } from 'react-router-dom'

function Card({name,image,id,release,type}) {





  return (
    <div>
      

    <div className="card" style={{width: "15rem",margin:"1rem",backgroundColor:"rgb(24,24,24)",color:"white",borderRadius:"1rem",boxShadow:"rgba(100, 100, 111, 0.2) 0px 7px 29px 0px"}}>
        <img src={image} alt='image'/>
        <div className="card-body">
            <h5 className="card-title" >{name}</h5>
            <div className="card-text"style={{color:"rgb(179,179,179)"}}>
              Release date: {release} 
              <br/> 
              {type}
              </div>
            {/* <Link to='/' className="btn btn-secondary">Arijit Singh</Link> */}
        </div>
    </div>




    </div>
  )
}

export default Card
