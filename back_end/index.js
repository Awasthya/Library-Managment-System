const express = require('express');
const app = express();
const mysql = require('mysql');
const path = require('path');
const router = require('./router/getrouter');
const cookieparser = require('cookie-parser');


app.use(cookieparser());
require("dotenv").config();
app.use(express.json())
app.use(router);


app.listen(8000,() => {
    console.log( "Server is Listening...");

})