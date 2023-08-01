import React from 'react'
import icon from './loading.gif'

function Spinner() {
    //height={85} width={85}
  return (
    <div className='text center' style={{marginTop:"4rem"}}>
      {/* <img src={icon} />  */}
      <h3 style={{fontWeight:"bolder"}}>loading . . .</h3>
    </div>
  )
}

export default Spinner
