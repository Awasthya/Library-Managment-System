
import './App.css';
import StudentNavbar from './component/StudentNavbar';
import Navbar from './component/Navbar';
import Footer from './component/Footer';
import Home from './component/Home';
import { Router, Routes, Route } from 'react-router-dom';
import { createContext, Profiler, useEffect, useState } from 'react';
import Feathers from './component/Feathers';
import ScrollToTop from './component/ScrollToTop';
import About from './component/About';
import AddBook from './component/Feathers/AddBook';
import AdminNavbar from './component/AdminNavbar';
import IssueBook from './component/Feathers/IssueBook';
import Login from './component/Login';
import Register from './component/Register';
import ReturnBook from './component/Feathers/ReturnBook';
import EditBook from './component/Feathers/EditBook';
import UniqueBookEdit from './component/Feathers/UniqueBookEdit';
import Profile from './component/Profile';
import Library from './component/Library';
import IssueStudentBook from './component/IssueStudentBook';
import StudentIssue from './component/StudentIssue';
export const UserContext = createContext();
function App() {
  const [user, setuser] = useState("admin");
  const callAuth = async() => {
    try {
      const res = await fetch('/auth', {
        method: 'GET',
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        credentials : "include"
      });
      const data = await res.json();
      setuser(data.type);
      if (!res.status === 200) {
        const error = new Error(res.error)
        throw Error(error);
      }
      
    } catch (err) {
      
    }
  }
  useEffect(() => {
    callAuth();
  }, []);
  if(user === 'student'){
  return (
    
    <div className="App">
        <StudentNavbar />
      <Routes>
          <Route exactly path="/" element={<Home />} />
          <Route exactly path="/profile" element={<Profile />} />
          <Route exactly path="/about" element={<About />} />
          <Route exactly path="/library" element={<Library />} />
          <Route exactly path="/studentissuebook" element={<StudentIssue />} />
          <Route exactly path='/issuestudentbook/:id' element={<IssueStudentBook />}/>
        </Routes>
        <div className="footer"><Footer /></div>
    </div>
    );
  } else if (user === 'admin') { 
    return (
    
      <div className="App">
        <ScrollToTop>
          <AdminNavbar />
        <Routes>
            <Route exactly path="/" element={<Home />} />
            <Route exactly path="/Feathers" element={<Feathers />} />
            <Route exactly path="/about" element={<About />} />
            <Route exactly path="/addBook" element={<AddBook />} />
            <Route exactly path="/issueBook" element={<IssueBook />} />
            <Route exactly path="/login" element={<Login />} />
            <Route exactly path="/register" element={<Register />} />
            <Route exactly path="/returnBook" element={<ReturnBook />} />
            <Route exactly path="/editBook" element={<EditBook />} />
            <Route  path="/uniqueBookEdit/:id" element={<UniqueBookEdit />} />
          </Routes>
          </ScrollToTop>
          <div className="footer"><Footer /></div>
          
      </div>
      );
  }
  else {
    return (
    
      <div className="App">
        <ScrollToTop>
          <Navbar />
        <Routes>
            <Route exactly path="/" element={<Home />} />
            <Route exactly path="/Feathers" element={<Feathers />} />
            <Route exactly path="/about" element={<About />} />
            <Route exactly path="/addBook" element={<AddBook />} />
            <Route exactly path="/issueBook" element={<IssueBook />} />
            <Route exactly path="/login" element={<Login />} />
            <Route exactly path="/register" element={<Register />} />
            <Route exactly path="/returnBook" element={<ReturnBook />} />
            <Route exactly path="/editBook" element={<EditBook />} />
            <Route  path="/uniqueBookEdit/:id" element={<UniqueBookEdit />} />
          </Routes>
          </ScrollToTop>
          <div className="footer"><Footer /></div>
          
      </div>
      );
  }
}

export default App;
