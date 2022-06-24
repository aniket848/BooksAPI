const dotenv = require('dotenv');
const express = require('express');
const mongoose  = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

dotenv.config({path:'./config.env'});
require('./DB/db');

const port = process.env.PORT;

app.use(express.json()); //our system automatically understand json data 
app.use(cookieParser());
app.use(require('./router/auth'));

app.listen(port,()=>{
    console.log('server is running at port 4000');
});



