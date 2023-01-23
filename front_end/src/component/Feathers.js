import React, { useEffect } from 'react';
import renew from "./image/renewBook.jpg";
import addBookIcon from "./image/addBookIcon.png";
import edit from "./image/edit.png";
import removeBook from "./image/removeBook.png";
import returnBook from "./image/returnBook.jpg";
import searchBook from "./image/searchBook.png";
import issueBook from "./image/issueBook.jpg";
import { useNavigate } from 'react-router-dom';
import  './CSS/feathers.css';
import { NavLink } from 'react-router-dom';
const Feathers = () => {
  let navigate = useNavigate();
  const callAdminAuth = async () => {
    try {
    const res = await fetch('/authAdmin', {
      method: 'GET',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "include"
    });
    const data = await res.json();
    if (!res.status === 200) {
      const error = new Error(res.error)
      throw Error(error);
    }
      
  } catch (err) {
      
    console.log(err);
      navigate('/login');
  }

}
useEffect(() => {
  callAdminAuth();
},[])
  return (
    <div id="weather">
      <h1>Feathers App</h1>
      <div className="containtt">
        <div className='container'>
        <NavLink to="/addBook"> <img src={renew} className="icon1" alt="Renew Book" /></NavLink>
          <p class="text">Renew Book</p>
        </div>
        <div className='container'>
        <NavLink to="/issueBook"> <img src={issueBook} className="icon1" alt="issue Book" /></NavLink>
        </div>
        <div className='container'> 
        <NavLink to="/addBook"><img src={addBookIcon} className="icon" alt="Renew Book" /></NavLink>
          <p class="text">Add New Book</p>
        </div>
        <div className='container'> 
        <NavLink to="/editBook"> <img src={edit} className="icon" alt="Renew Book" /></NavLink>
          <p>Edit Existing Book</p>
        </div>
        <div className='container'>
        <NavLink to="/removeBook"><img src={removeBook} className="icon" alt="Renew Book" /></NavLink>
          <p>Remove Book</p>
        </div>
        <div className='container'>
        <NavLink to="/returnBook"> <img src={returnBook} className="icon" alt="Renew Book" /></NavLink>
          <p>Return Book</p>
        </div>
        <div className='container'>
        <NavLink to="/searchBook"> <img src={searchBook} className="icon" alt="Renew Book" /></NavLink>
          <p>Search Book</p>
        </div>
        
      </div>
    </div>
  )
}

export default Feathers
