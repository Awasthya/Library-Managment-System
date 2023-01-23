import React, { useState } from 'react';
import signup from '../images/signup-image.jpg';
import './CSS/Register.css';
import {NavLink,useNavigate} from 'react-router-dom';
const Register = () => {
    const History = useNavigate();
    const [user, setUser] = useState({
       name:"", email:"",rollno:"",Sclass:"", section:"",address:"",phone:"",
        password: "",
        cpassword: ""
    });
    let name,value;

    const handleInput = (event) =>{
        name = event.target.name;
        value = event.target.value;
        console.log(value);
        setUser({ ...user, [name]: value });
        
        console.log(value);
    }
    const postData = async (e) => {
        e.preventDefault();
        const { name, email,rollno,Sclass, section,address,phone,password,cpassword} = user;
        const res = await fetch("/register", {
            method: "POST",
            headers : {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                name, email,rollno,Sclass, section,address,phone,password,cpassword
            })           
        });           

        
        const data = await res.json();
        console.log('hel');
        if (data.status === 422 || !data ) {
            window.alert(data.message);    
        } else {
            window.alert(data.message);
            History.push('/signin');
        }
    }
  return (
  <>
   <div >
<section className="signup">
    <div className="container">
        <div className="signup-content">
            <div className="signup-form">
                <h2 className="">Sign up</h2>
                <form method="POST" className="register-form" id="register-form" action=''>
            
        <div className="">                      
        <label for="name"></label>
        <input type="text" name="name" id="name"
        value={user.name}
                        onChange={handleInput}
        placeholder="Enter Your Name"/>
                    </div>
                    <div className="">
                        <label for="email"></label>
                        <input type="email" name="email" id="email" value={user.email} onChange={handleInput}  placeholder="Enter Your Email"/>
                    </div>
                    <div className="">
                        <label for="Roll NO"></label>
                        <input type="text" name="rollno" id="rollno" value={user.rollno} onChange={handleInput} placeholder="Enter Your Roll No"/>
                    </div>
                    <div className="">
                        <label for="student Class"></label>
                        <input type="text" name="Sclass" id="sclass" value={user.Sclass} onChange={handleInput} placeholder="Enter Your Class"/>
                    </div>

                    <div className="">
                        <label for="Section"></label>
                        <input type="text" name="section" id="section" value={user.section}  onChange={handleInput} placeholder="Enter Your Section"/>
                    </div>
                     <div className="">
                        <label for="Address"></label>
                        <input type="text" name="address" id="address" value={user.address} onChange={handleInput} placeholder="Enter Your address"/>
                     </div>
                              
                    <div className="">
                        <label for="Phone"></label>
                        <input type="text" name="phone" id="phone" value={user.phone} onChange={handleInput} placeholder="Your Number"/>
                    </div>
                    <div className="">
                        <label for="pass"></label>
                        <input type="password" name="password" id="pass" value={user.password} onChange={handleInput} placeholder="Password"/>
                    </div>
                    <div className="">
                        <label for="repass"></label>
                        <input type="password" name="cpassword" id="re_pass" value={user.cpassword} onChange={handleInput} placeholder="Repeat your password"/>
                    </div>
               
                    <div className=" form-button">
                        <input type="submit"  onClick = {postData} name="signup" id="signup" className="form-submit" value="Register"/>
                    </div>
                </form>
            </div>
            <div className="signup-image">
                <figure><img src={signup} className = "signup-image" alt="sign up image"/></figure>
                <NavLink to="/signin">Already an member</NavLink>
            </div>
        </div>
    </div>
</section>

</div>
  </>
  )
}

export default Register
