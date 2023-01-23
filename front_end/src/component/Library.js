import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import './CSS/library.css';
const Library = () => {

  const [studentid, setuser] = useState();
  const [Book, setBook] = useState([]);
  const showdialog = async(book) => {
    console.log(book.id);
        const res1 = await fetch('/auth', {
          method: 'GET',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          credentials : "include"
        });
    const data1 = await res1.json();
        setuser(data1.id);
        if (!res1.status === 200) {
          const error = new Error(res1.error)
          throw Error(error);
    }
    const currdate = new Date();
    const issuedate = currdate.getDate() + ' ' + (currdate.getMonth() + 1) + ' ' + currdate.getFullYear();
    const returndate = currdate.getDate() + ' ' + (currdate.getMonth() + 2) + ' ' + currdate.getFullYear();
    
        console.log(book);
    console.log(studentid);
    const { id, title } = book;
    const bookid = id;
      const res = await fetch('/studentIssue/:id', {
          method: 'POST',
          headers: {
              "Content-Type": "application/json"
        },
        body:JSON.stringify({
          studentid,bookid,title,issuedate,returndate
        })
      });
    const data = res.json();
    console.log(data);
  }
  
  const callAuth = async() => {
    try {
      const res = await fetch('/AllBook', {
        method: 'GET',
        headers: {
          "Content-Type": "application/json"
        },
      });
      const data = await res.json();
      
        setBook(data);
      if (!res.status === 201) {
        const error = new Error(res.error)
        throw Error(error);
      }
      
    } catch (err) {
      console.log("error");
    }
  }
  useEffect(() => {
    callAuth();
  }, []);
  return (
      <div className='tableclass'>
          
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
                                <input  type='button'  onClick={() => showdialog(val)} className='design' value='Borrow' />
                        </tr>
              )
              })}
  
</table>
    </div>
  )
}

export default Library
