import React from 'react'
import { FaFutbol } from "react-icons/fa"
import { Link } from "react-router-dom";

function Header() {
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
        <Link
          to="/login"
          style={{
            marginLeft: "60%",
            marginTop: "100px",
            width: "130px",
            height: "40px",
            backgroundColor: "red",
            color: "white",
            fontWeight: "bold",
            border: "none",
            borderRadius: "6px",
            textAlign: "center",
            lineHeight: "40px", // centers text vertically
            textDecoration: "none",
            cursor: "pointer",
            display: "inline-block",
            transition: "background-color 0.3s ease, transform 0.2s ease"
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
    </div>
  )
}

export default Header
