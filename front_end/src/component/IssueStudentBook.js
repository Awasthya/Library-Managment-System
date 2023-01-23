import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

const IssueStudentBook = () => {
    const { id } = useParams();
    const callIssue = async () => {
        console.log('hii');
        const res = await fetch('/studentIssue/:id', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = res.json();
        console.log(data);

    }
    useEffect(()=>{
        callIssue()
    },[])
  return (
    <div>
          
    </div>
  )
}

export default IssueStudentBook
