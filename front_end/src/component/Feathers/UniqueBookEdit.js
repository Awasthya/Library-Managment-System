import React from 'react'
import './AddBook.css';
import axios from 'axios';
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
const UniqueBookEdit = () => {
  const [user, setUser] = useState({
    title:"",author:"",descript:"",category:"Art/Architecture",noOfBooks:""
  })
  const { id } = useParams();
  console.log(`1->${id}`);
   const UserInfo = async () => {
        try { 
            const res = await fetch(`/getdata/${id}`, {
            
                headers: {
                    Accept : 'application/json',
                    'Content-Type': 'application/json'
                    
                  },
                  credentials:'include'
                
            });
            const data = await res.json();
          //  console.log(data);
                setUser(data);
          } catch (err) {
            console.log(err);
            }
    }
    const storeData = async (e) => {
        e.preventDefault();
        
       const { header,firstName, lastName, description, Email, phone} = user;
        const res = await fetch(`/Updatepersonal/${id}`, {
            method: "PATCH",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                
            },
            body: JSON.stringify({
               firstName, lastName, description, Email, phone
            })
            
        });
        
        const data = await res.json();
        
        if (!data) {
            window.alert("data is not stored");
        } else {
            window.alert('changes made');
            
        }
    }
    useEffect(() => {
        UserInfo();
    }, []);
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
        <form method="POST" action='uniqueBookEdit'>
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
                    <label className='lab'> Books Id: </label>
            <input type="text" name="noOfBooks" value={user.noOfBooks} onChange={handleInput} class ="input"/>      
                  </div>
                  <div className=' content'>
                    <input type='submit' className='but' value="Add Book" />     
                </div>
            </div>
        </form>
    </div>
  )
}

export default UniqueBookEdit
