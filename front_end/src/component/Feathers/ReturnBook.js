import React from 'react'
import './AddBook.css';
import axios from 'axios';
import { useState } from 'react'
const AddBook = () => {
  const [user, setUser] = useState({
    studentid:"",bookid:""
  })
  let name, value;
  const handleInput = (e) => {
    // /e.preventDefault();
    name = e.target.name;
    value = e.target.value;
    console.log(value);
    setUser({ ...user, [name]: value });
  }
  
  const postData = async (e) => {
    e.preventDefault();
    const { studentid,bookid } = user;
    const res = await fetch("/returnBooks", {
      method: "POST",
      headers : {
          "Content-Type": "application/json"
      },
      body:JSON.stringify({
        studentid,bookid
      })
    });
    
    //const data = await res.json();
    console.log(res);
    if (res.status === 422 || !res) {
      window.alert("Invalid Register");
    } else {
      window.alert(" Book Return successfully");
      History.push('/Feathers');
    }

  }
  return (
    <div>
        <form method="POST">
            <div className="AddBookbox">      
                <div className=' content'>
                    <label className='lab'> Student ID : </label>
            <input type="text" name="studentid" value={user.studentid} onChange={handleInput} class ="input"/>      
                  </div>
                  <div className=' content'>
                    <label className='lab'> Book Id: </label>
            <input type="text" name="bookid" value={user.bookid} onChange={handleInput} class ="input"/>      
                  </div>
             
                  <div className=' content'>
                    <input type='submit' className='but' onClick={postData} value="Return Book" />     
                </div>
            </div>
        </form>
    </div>
  )
}

export default AddBook
