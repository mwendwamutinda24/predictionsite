import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { jwtDecode } from "jwt-decode";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // ✅ Use environment variable for backend URL
  const API_URL = process.env.REACT_APP_API_URL || "https://predictionsite-2.onrender.com.com";

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Login success', { autoClose: 2000 });
        localStorage.setItem("token", data.token);

        // ✅ Decode token to check status
        const decoded = jwtDecode(data.token);
        console.log("Decoded token:", decoded);

        if (decoded.status === "admin") {
          // ✅ Admin gets choice
          setTimeout(() => {
            const goHome = window.confirm("You are admin. Go to Home (OK) or Site (Cancel)?");
            if (goHome) {
              navigate("/");
            } else {
              navigate("/site");
            }
          }, 2000);
        } else {
          // ✅ Normal user goes home
          setTimeout(() => {
            navigate("/");
          }, 2000);
        }
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
          <div className="details">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              placeholder="Enter Your email" 
              required
              onChange={handleChange}
            />
          </div>
          
          <div className="details">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="Enter your password" 
              required
              onChange={handleChange}
            />
          </div>
          
          <div className="details">
            <button className="register">Login</button>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
