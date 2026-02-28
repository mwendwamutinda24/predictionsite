import React, { useState } from 'react'
import { FaFutbol } from "react-icons/fa"
import { FaSun } from "react-icons/fa"   // brighten icon
import { Link } from "react-router-dom";

function Header() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleBackground = () => {
    setDarkMode(!darkMode);

    if (darkMode) {
      // back to light mode
      document.body.style.background = "whitesmoke";
     
    
    } else {
      // dark mode
      document.body.style.background = "rgb(11, 1, 20)";
      // ✅ all text (including table data) turns white
    }
  };

  return (
    <div className="header">
      <div className="football">
        <i><FaFutbol size={30} color="white" style={{ padding: 10 }} /></i>
        <h1>Ziggy Tips</h1>
      </div>

      <div className="header1">
        <p>Daily football predictions </p>
      </div>

      <div className="logout" style={{ marginTop: "10px" }}>
        <Link
          to="/login"
          style={{
            width: "130px",
            height: "40px",
            backgroundColor: "red",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
            textAlign: "center",
            lineHeight: "40px",
            textDecoration: "none",
            cursor: "pointer",
            display: "inline-block",
            transition: "background-color 0.3s ease, transform 0.2s ease",
            maxWidth: "100%" // ensures it can expand
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#d62828";
            e.target.style.transform = "translateY(-2px)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "red";
            e.target.style.transform = "translateY(0)";
          }}
        >
          Logout
        </Link>
      </div>

      <div className="toggle-theme" style={{ marginTop: "15px" }}>
        <FaSun 
          size={25} 
          color="yellow" 
          style={{ cursor: "pointer" }} 
          onClick={toggleBackground} 
        />
      </div>
    </div>
  )
}

export default Header
