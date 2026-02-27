import React from 'react'
import { FaFutbol } from "react-icons/fa"

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

    </div>
  )
}

export default  Header
