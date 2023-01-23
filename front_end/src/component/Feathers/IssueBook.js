import React from 'react'
import './AddBook.css';
import axios from 'axios';
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const AddBook = () => {
  
  let navigate = useNavigate();
  const [user, setUser] = useState({
    title:"",bookid:"",studentid:"",returndate:"",issuedate:""
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
    const { title, bookid, studentid, returndate, issuedate } = user;
    console.log( title, bookid, studentid);
    const res = await fetch("/issueBooks", {
      method: "POST",
      headers : {
          "Content-Type": "application/json"
      },
      body:JSON.stringify({
        title, bookid, studentid,returndate,issuedate
      })
    });
    
    const data = await res.json();
    console.log(res);
    if (res.status === 422 || !res) {
      window.alert("Invalid Register");
    } else {
      window.alert(data.message);
      navigate('/Feathers')
    }

  }
  return (
    <div>
        <form method="POST">
            <div className="AddBookbox">      
                <div className='content'>
                    <label className='lab'>Title of Book : </label>
            <input type="text" name="title" value={user.title} onChange={handleInput} class ="input"/>      
                  </div>
                  <div className='content'>
                    <label className='lab'>  Book Id : </label>
            <input type="text" name="bookid" value={user.bookid} onChange={handleInput} class ="input"/>      
          </div>
                  <div className='content'>
                    <label className='lab'> Student ID : </label>
                    <input type="text" name="studentid" value={user.studentid} onChange={handleInput} class ="input"/>      
          </div>
          <div className='content'>
                    <label className='lab'>  Book Issue Date: </label>
            <input type="text" name="issuedate" value={user.issuedate} onChange={handleInput} class ="input"/>      
          </div>
          <div className='content'>
                    <label className='lab'>  Book return Date: </label>
            <input type="text" name="returndate" value={user.returndate} onChange={handleInput} class ="input"/>      
          </div>
          
                <div className='content'>
                    <input type='submit' className='but' onClick={postData} value="Add Book" />     
                </div>
            </div>
        </form>
    </div>
  )
}

export default AddBook
