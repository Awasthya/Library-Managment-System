const jwt = require('jsonwebtoken'); 

const cookieParser = require("cookie-parser");
const express = require('express');
const app = express();

const db = require('./../connect');
const authenticate = async(req,res,next) => {
    try {
        console.log('dsfds');
        const token =  req.cookies.jwtoken;
        
        console.log("xsdgdfg");
        let data;
        const rootUser1 = await db.query(`select * from student_details where tokens = '${token}' and id = 1`, (err, result) => {
            
            if (!rootUser1)
            {
                console.log('dfdfd');
            } else {
                if (err)
                    console.log(err);
                
                data = result;
                req.token = token;
                req.data = data;
                req.userId = rootUser1.id;
                console.log('sdfdfg');
                next();
            }
        })
        const verifytoken =  jwt.verify(token, process.env.JWT_SECRET);
        const rootUser = await db.query(`select * from student_details where tokens = '${token}' and id = ${verifytoken.id}`, (err, result) => {
            
            if (!rootUser)
            {
                console.log('error');
                throw new Error('User Not Found')
            }
            if (err)
                console.log(err);
            
            data = result;
            req.token = token;
            req.data = data;
            req.userId = rootUser.id;
            console.log('sdfdfg');
            next();
        })

    } catch (err) {
        console.log("sdfdfg");
        res.status(402).send('Unauthorized ')
    }
}

module.exports = authenticate;