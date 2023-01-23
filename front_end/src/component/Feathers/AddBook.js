import React from 'react'
import './AddBook.css';
import axios from 'axios';
import { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
const AddBook = () => {
  let navigate = useNavigate();
  const [user, setUser] = useState({
    title:"",author:"",descript:"",category:"Art/Architecture",noOfBooks:""
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
    const { title, author, descript, category,noOfBooks } = user;
    console.log(title, author, descript, category, noOfBooks);
    const res = await fetch("/addBooks", {
      method: "POST",
      headers : {
          "Content-Type": "application/json"
      },
      body:JSON.stringify({
        title, author, descript, category, noOfBooks
      })
    });
    
    const data = await res.json();
    console.log(res);
    if (res.status === 422 || !res) {
      window.alert("Invalid Register");
    } else {
      window.alert(data.message);
      navigate('/Feathers');
    }

  }
  return (
    <div>
        <form method="POST">
            <div className="AddBookbox">      
                <div className=' content'>
                    <label className='lab'>Title of Book : </label>
            <input type="text" name="title" value={user.title} onChange={handleInput} class ="input"/>      
                  </div>
                  <div className=' content'>
                    <label className='lab'>Author of Book : </label>
            <input type="text" name="author" value={user.author} onChange={handleInput} class ="input"/>      
                  </div>
                  <div className=' content'>
                    <label className='lab'>Description of Book : </label>
            <textarea type="text" name="descript" value={user.descript} onChange={handleInput} class ="input" width="10" height="100"/>      
                  </div>
                  <div className=' content'>
                      <label className='lab'>Category : </label>
            <select className="input" name="category" value={user.category} onChange={handleInput}>
                            <option value="Art/Architecture">Art/Architecture</option>
                            <option value="Autobiography">Autobiography</option>
                            <option value="Bussiness">Bussiness</option>
                            <option value="CookBook">Cookbook</option>
                        </select>  
                  </div>
                  <div className=' content'>
                    <label className='lab'>Number of Books : </label>
            <input type="text" name="noOfBooks" value={user.noOfBooks} onChange={handleInput} class ="input"/>      
                  </div>
                  <div className=' content'>
                    <input type='submit' className='but' onClick={postData} value="Add Book" />     
                </div>
            </div>
        </form>
    </div>
  )
}

export default AddBook
