import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import './CSS/library.css';
const StudentIssue = () => {

  const [user, setUser] = useState();
  const [Book, setBook] = useState([]);
  const returnBook = async(book) => {
        
  }
  
  const callAuth = async() => {
      try {
        const res = await fetch(`/uniquestudentIssue`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"  
          }
        });
        
      const data = await res.json();
      
        setBook(data);
      if (!res.status === 201) {
        const error = new Error(res.error)
        throw Error(error);
      }
      
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    callAuth();
  }, []);
  return (
      <div>
          
      <table >
  <tr>
    <th>Book Name</th>
    <th>Author</th> 
    <th>description</th>
    <th>category</th>
    <th>student_id </th>
    <th>No of Book</th>
    <th>No of Issue</th>
    <th>status</th>
              </tr>
              {Book?.map((val, index) => { 
               return( <tr>
                                <td>{ val.title}</td>
                                <td>{val.author }</td>
                                <td>{val.descript}</td>
                                <td>{val.category}</td>
                                <td>{val.Student_id}</td>
                                <td>{val.noOfBooks}</td>
                                <td>{val.onOfIssue}</td>
                                <td>{val.status}</td>
                                <input  type='button'  onClick={() => returnBook(val)} className='design' value='Return' />
                        </tr>
              )
              })}
  
</table>
    </div>
  )
}

export default StudentIssue
