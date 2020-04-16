const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

const app = express();

app.use(cookieParser());
app.use(express.json());

// Connection to database
mongoose.connect('mongodb://localhost:27017/mernauth', {useNewUrlParser : true , useUnifiedTopology: true}, ()=> {
    console.log('successfully connected to mongose database');
} );



//Testing user model without front-end

const User = require('./models/user');

const userInput = {
    username: "oneil213",
    password: "morakinyo263",
    role: "admin"
}

const user = new User(userInput);
user.save((err, document)=>{
    if(err)
        console.log(err);
    console.log(document);
});

// Start App & Port Determination
app.listen(5000, ()=> {
    console.log('express server started');
});