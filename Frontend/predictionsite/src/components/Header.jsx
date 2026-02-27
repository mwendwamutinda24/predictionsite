import React from 'react'
import { FaFutbol } from "react-icons/fa"
import {Link} from "react-router-dom";

function  Header() {
  return (
    <div className="header">
        <div className="football">
             <i><FaFutbol size={30} color="white" padding={10} /></i>
              <h1>Ziggy Tips</h1>


          
        </div>
        <div className="header1">
           
            <p>Daily football predictions </p>
        </div>
<div className="logout">
  <button className="logout-btn" style={{marginLeft:"80%", background:"red",width:"200px",height:"40px",textDecoration:"none"}}><Link to="/login">Logout</Link></button>
</div>
    </div>
  )
}

export default  Header
