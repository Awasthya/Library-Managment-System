import React from 'react'
import './AddBook.css';
import axios from 'axios';
import { useState } from 'react'
import { NavLink } from 'react-router-dom';
const EditBook = () => {
  const [user, setUser] = useState({
    bookid :0
  })
  let name, value;
  const handleInput = (e) => {
    // /e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    console.log(value);
    setUser({ ...user, [name]: value });
  }
   

  return (
    <div>
        <form method="POST" >
            <div className="AddBookbox">      
   
                <div className=' content'>
                    <label className='lab'> Books Id: </label>
            <input type="text" name="bookid" value={user.bookid} onChange={handleInput} class ="input"/>      
                </div>
                <div className=' content'>
                      
                  <NavLink to={`uniqueBookEdit/${user.bookid}`}><input type='submit' className='but'  posvalue="Add Book" />   </NavLink>
                </div>
            </div>
        </form>
    </div>
  )
}

export default EditBook
