const { application, query } = require('express');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authenticate = require('./authenticate');
const cookieParser = require("cookie-parser");
const db = require('./../connect');
router.use(cookieParser());

router.get('/createDb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if (err){
            console.log(err);
        }
        console.log(result);
        res.send('database create....');
    })
})

router.get('/', (req, res) => {
    console.log('hello');
   
});
router.get('/auth', (req, res) => {
    try {
        const token =  req.cookies.jwtoken;
        let data;
    
        const verifytoken =  jwt.verify(token, process.env.JWT_SECRET);
       // console.log(verifytoken);
          db.query(`select * from student_details where tokens = '${token}' and id = ${verifytoken.id}`, (err, result) => {
            
            if (!result)
            {
                console.log('error');
                throw new Error('User Not Found')
            }
            
            data = result[0];
            return res.status(200).send(result[0]);
        })
    } catch (err) {
        res.status(402).send('Unauthorized ')
    }
})
router.get('/authAdmin', (req, res) => {
    try {
        
        const token =  req.cookies.jwtoken;
        let data;
        //console.log(token);
        const verifytoken =  jwt.verify(token, process.env.JWT_SECRET_ADMIN);
        console.log(verifytoken);
          db.query(`select * from student_details where tokens = '${token}' and id = ${verifytoken.id}`, (err, result) => {
            
            if (!result)
            {
                console.log('error');
                throw new Error('User Not Found')
            }
            
            data = result[0];
            return res.status(200).send(result[0]);
        })
    } catch (err) {
        res.status(402).send('Unauthorized ')
    }
})
router.post('/addBooks', async(req, res) => {
    const {title,author,descript,category,noOfBooks} = req.body;
    
    if(!title || !author || !descript || !category || !noOfBooks ){
        res.status(400).json( {message : "Please Fill the data properly"})
    }
    let body = req.body;
    let sql = 'INSERT INTO BOOKS SET ?';
    let query = db.query(sql, body, (err, result) => {
        if (err){
            console.log(err);
            
            res.status(422).json({message :"Cann't add Book "});
        }
        console.log( result);
        
    res.status(201).json({message :"Book added successfully "});
    })
});
router.post('/register', async(req, res) => {
    console.log(req.body);
    let { name, email, rollno, Sclass, section, address, phone, password } = req.body;
    const { cpassword } = req.body;
    if (!name || !email || !rollno || !Sclass || !section || !address|| !phone|| !password|| !cpassword) {
        return res.status(400).json( {message : "Please Fill your complete details..."})
    }
    if (password != cpassword) {
        return res.status(400).json( {message : "password not matched..."})
    }
     db.query('SELECT rollno FROM STUDENT_DETAILS WHERE rollno = ?', [rollno], async(err, result) => {
        if (err)
            console.log(err);
        console.log(result.length);
        if (result.length > 0) {
            return res.status(422).json({message :"That Roll No Is Already Exist"});
        } else {
            let hashpassword =  await bcrypt.hash(password, 8);
    password = hashpassword;
    let body = { name, email, rollno, Sclass, section, address, phone, password };

    let sql = "INSERT INTO student_details SET ? ";
    let query = db.query(sql, body, (err, result) => {
        if (err){
            console.log(err);
            
           return  res.status(422).json({message :"Cann't be able to register "});
        }
        console.log( result);
        
    return res.status(201).json({message :"Register Succesfully"});
    })
        }
    })

    
})
router.post('/studentIssue/:id', (req, res) => {
    const { studentid, bookid,title,issuedate,lastdate } = req.body;
    if (studentid) {
    if( !bookid || !studentid){
        res.status(400).json( {message : "Please Fill the data properly"})
    }
    let body = req.body;
    const state = 'Issue';
    console.log('1');
    let sql3 = `select noOfIssue,noOfBooks from books where id = ${bookid}`;
    let newNoOfIssues = db.query(sql3, (err, result) => {
        if (err) {
            console.log(err);
        }
        
        let noi = result[0].noOfIssue + 1;
        let nob = result[0].noOfBooks - 1;
        console.log('2');
        let sql2 = `UPDATE books SET status = 'ISSUE', Student_id= '${studentid}',noOfIssue =${noi},noOfBooks = ${nob}  where id = '${bookid}'`;
        let query2 = db.query(sql2, (err, result) => {
            if (err) {
                console.log(err);
                res.status(422).json({ message: "Cann't add Book " });
            }
            console.log('3');
        })
        console.log('4');
        body.noOfIssue = noi;
      
        let sql1 = `INSERT INTO IssueBooks SET ?`;
        console.log(body);
        let query1 = db.query(sql1, body, (err, result) => {
            if (err) {
                console.log(err);
                console.log(result);
                res.status(422).json({ message: "Cann't add Book " });
            }
        })
    })
}
res.status(201).json({ message: "Book Issued Successfully" });  
})


router.post('/returnBooks', (req, res) => {
    const { studentid, bookid } = req.body;
    const body = req.body;
    console.log(bookid);
    const sql = `DELETE FROM issueBooks where bookid = '${bookid}'and studentid = '${studentid}'`;
    let query = db.query(sql, (err, result) => {
        if (err) {
            return res.status(422).json({ message: "Cann't be able to return " });
        }
        console.log('1');
        if (!result) {
            return res.status(422).json({ message: "Book Doesn't Exist" });
        }
        let sql3 = `select noOfIssue,noOfBooks from books where id = ${body.bookid}`;
        let newNoOfIssues = db.query(sql3, (err, result) => {
            if (err) {
                console.log(err);
            }
            console.log('2');
            console.log(result);
            let noi = result[0].noOfIssue - 1;
            let nob = result[0].noOfBooks + 1;
            let sql2 = `UPDATE BOOKS SET status = 'Available', Student_id= 'NONE',noOfIssue =${noi},noOfBooks = ${nob}  where id = '${body.bookid}'`;
        
            let query2 = db.query(sql2, (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(422).json({ message: "Cann't add Book " });
                }
            return res.status(201).json({ message: "Book Return successfully " });
            })
        })
    })
})

router.get('/AllBook', (req, res) => {
    let sql = "select * from books";
    db.query(sql, (err, result) => {
        if (err)
            return res.status(422).json(err);
        res.status(201).send(result);
    })
})
router.get('/uniquestudentIssue', (req, res) => {
    try {
        const token =  req.cookies.jwtoken;
        let data;
    
        const verifytoken =  jwt.verify(token, process.env.JWT_SECRET);
       // console.log(verifytoken);
          db.query(`select * from student_details where tokens = '${token}' and id = ${verifytoken.id}`, (err, result) => {
            
            if (!result)
            {
                console.log('error');
                throw new Error('User Not Found')
            }
            
              sid = result[0].id;
              console.log(sid);
              let sql = `select * from books where Student_id = ${sid}`;
              console.log(sql);
              db.query(sql, (err, result) => {
                  if (err)
                      return res.status(422).json(err);
                  console.log(result);
                  res.status(201).send(result);
              })
        })
    } catch (err) {
        res.status(402).send('Unauthorized ')
    }
   
})
router.post('/login', async(req, res) => {
    const { type } = req.body;  
    const { email, password } = req.body;
    console.log(req.body);
    if (!email || !password) {
        return res.status(422).json({ Error: "Please Fill the data properly" })
    }
    console.log(type);
    let run = true;
    if (type == 'Student') {
        let sql = `select * from student_details where email = '${email}'`;
        db.query(sql,async (err, result) => {
            if (err) {
                console.log("3werdgd");
                console.log(err);
                run = false;
               return  res.status(422).json(err);
            }
            let pass = bcrypt.hash(password, 8);
            console.log(result[0].password);
            if (!result.length || !await bcrypt.compare(password, result[0].password)) {
                
                return res.status(422).json({message :"Invalid credentials"});
            } else {
                console.log("cfghvgjvh");
                const token = jwt.sign({id : result[0].id}, process.env.JWT_SECRET, {
                    expiresIn: process.env.JWT_EXPIRES,
                
                })
                const cookiesOption = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRS * 24 * 60 * 60 * 1000),
                   
                }
                console.log(token);
                db.query(`UPDATE STUDENT_DETAILS SET tokens = ? where email = '${email}'`, [token], (err, reslt) => {
                    if (err)
                        console.log(err);
                })
                res.cookie("jwtoken", token, cookiesOption);
                return res.status(201).json({status:"success",message:"User has been loogged in "})
            }
        })
    } else {
        if (email == 'admin@gmail.com' && password == 'admin1234') {
            console.log("Admin");
                const token = jwt.sign({id : 1}, process.env.JWT_SECRET_ADMIN, {
                    expiresIn: process.env.JWT_EXPIRES,
                
                })
                const cookiesOption = {
                    expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRS * 24 * 60 * 60 * 1000),
                   
            }
            console.log(token);
                db.query(`UPDATE STUDENT_DETAILS SET tokens = ? where email = "admin@gmail.com"`, [token], (err, reslt) => {
                    if (err)
                        console.log(err);
                    console.log(reslt);
                })
                res.cookie("jwtoken", token, cookiesOption);
                return res.status(201).json({status:"success",message:"User has been loogged in "})
        } else {
            return res.status(422).json({message :"Invalid credentials"});
        }
    }
    
})
router.post('/issueBooks', async(req, res) => {
    const { title, bookid, studentid } = req.body;
    
    if(!title || !bookid || !studentid){
        res.status(400).json( {message : "Please Fill the data properly"})
    }
    let body = req.body;
    
    const state = 'Issue';
    let sql3 = `select noOfIssue,noOfBooks from books where id = ${body.bookid}`;
    let newNoOfIssues = db.query(sql3, (err, result) => {
        if (err) {
            console.log(err);
        }
        
        let noi = result[0].noOfIssue + 1;
        let nob = result[0].noOfBooks - 1;
        
        let sql2 = `UPDATE books SET status = 'ISSUE', Student_id= '${body.studentid}',noOfIssue =${noi},noOfBooks = ${nob}  where id = '${body.bookid}'`;
        
        let query2 = db.query(sql2, (err, result) => {
            if (err) {
                console.log(err);
                res.status(422).json({ message: "Cann't add Book " });
            }
            
        })
        body.noOfIssue = noi;
      
        let sql1 = `INSERT INTO IssueBooks SET ?`;
        let query1 = db.query(sql1, body, (err, result) => {
            if (err) {
                console.log(err);
                res.status(422).json({ message: "Cann't add Book " });
            }
        })
        res.status(201).json({ message: "Book Issued Successfully" });  
    })
});
router.get('/getdata/:id', (req, res) => {
    console.log(req.rootUser);
})
router.get('/createtable', (req, res) => {
    let sql = "CREATE TABLE BOOKS (id int AUTO_INCREMENT PRIMARY KEY,title VARCHAR(255),author VARCHAR(255),descript VARCHAR(255),category VARCHAR(555),books VARCHAR(255));";
    db.query(sql, (err, result) => {
        if (err)
            console.log(err);
        console.log(result);
        res.send('Book table is created...')
    });
});
module.exports = router;