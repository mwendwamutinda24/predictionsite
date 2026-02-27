import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

function Site() {
    const navigate = useNavigate();

     const [ formData, setFormData]=useState({
         time:'',
         home:'',
         away:'',
         league:'',
         prediction:'',
         odds:'',

     })
      const handleChange= e=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
      }
       const handleSubmit= async(e)=>{
        e.preventDefault();
        try{
  const res = await fetch("http://localhost:5000/auth/site", {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(formData)
});

   const data=await  res.json()
    if (res.ok) {
           toast.success('Prediction Successfully', { autoClose: 2000 });
          
   
           setTimeout(() => {
             navigate("/");
           }, 2000);
         } else {
           toast.error(data.message || "error posting Prediction");
         }
        } catch(error){
                     console.error(error);
                     console.error("Frontend error:", error);
                    toast.error('Server error',error);
        }

       }

       
  return (
    <div className="register">
        <div className="form">
            
            <form onSubmit={handleSubmit}>
                <h2>Post your prediction</h2>
                  <div className="details">
                    <label>Start Time</label>
                    <input type="text" name="time" placeholder="Enter start time"
                     onChange={handleChange} required/>
                </div>
                <div className="forms-unit">
                     <div className="details1">
                    <label>Home Team</label>
                    <input type="text" name="home" placeholder="Enter home Team" 
                     onChange={handleChange}required/>
                 </div>
                 <p>Vs</p>
                 <div className="details1">
                    <label>Away Team</label>
                    <input type="text" name="away" placeholder="Enter away Team"
                     onChange={handleChange} required/>
                </div>

                </div>
                  <div className="details">
                    <label>League</label>
                    <input type="text" name="league" placeholder="Enter League"
                     onChange={handleChange} required/>
                </div>
                
                <div className="details">
                    <label>Prediction</label>
                    <input type="text" name="prediction" placeholder="Create your prediction"
                     onChange={handleChange} required/>
                </div>
                
                 <div className="details">
                    <label>Odds</label>
                    <input type="text" name="odds" placeholder="Enter Outcome Odds" 
                     onChange={handleChange} required/>
                </div>
              
                <div className="details">
                    <button className="register">Post Prediction</button>
                </div>
                
            </form>
        </div>
    </div>

   
  )
}

export default Site