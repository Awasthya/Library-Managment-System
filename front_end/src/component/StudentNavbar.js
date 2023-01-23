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
                  <li ><NavLink to="/profile"><b className="tab">Profile</b></NavLink></li>
          <li ><NavLink to="/studentissuebook"><b className="tab">Issue Books</b></NavLink></li>
          <li ><NavLink to="/library"><b className="tab">Library</b></NavLink></li>
          <li ><NavLink to="/register"><b className="tab">logout</b></NavLink></li>
              </ul>    
        </div>
      </form>
    </div>
  )
}

export default Navbar
