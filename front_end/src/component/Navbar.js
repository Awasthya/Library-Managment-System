import React, { useEffect, useState } from 'react'
import './CSS/Navbar.css';
import { NavLink } from 'react-router-dom';
const Navbar = () => {

  
  return (
    <div >
      <form method ='GET'>

          <div className="navv">
              <ul className="containt">
                  <li ><NavLink to="/"><b className="tab">Home</b></NavLink></li>
          <li ><NavLink to="/login"><b className="tab">Login</b></NavLink></li>
          <li ><NavLink to="/register"><b className="tab">Register</b></NavLink></li>
              </ul>    
        </div>
      </form>
    </div>
  )
}

export default Navbar
