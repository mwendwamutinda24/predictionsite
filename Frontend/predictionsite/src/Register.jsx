import React, { useState } from 'react';
import {Link} from "react-router-dom";
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // make sure you import navigate

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Account Created Successfully', { autoClose: 2000 });
        localStorage.setItem("token", data.token);

        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        toast.error(data.message || "Invalid Email/password");
      }
    } catch (err) {
      console.error(err);
      toast.error('Server error');
    }
  };

  return (
    <div className="register">
      <div className="form">
        <form onSubmit={handleSubmit}>
          <h2>Create your account here</h2>
          <div className="forms-unit">
            <div className="details1">
              <label>Phone Number</label>
              <input 
                type="number" 
                name="number" 
                placeholder="Enter Phone Number" 
                value={formData.number}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="details1">
              <label>UserName</label>
              <input 
                type="text" 
                name="name" 
                placeholder="Enter your name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
            </div>
          </div>
          
          <div className="details">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter Your email" 
              value={formData.email}
              onChange={handleChange}
              required 
            />
          </div>
          
          <div className="details">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Create your password" 
              value={formData.password}
              onChange={handleChange}
              required 
            />
          </div>
          <div className="details">
            <button type="submit" className="register">Create Account</button>
            <p>Already have an account? <Link to="/login">Login</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
