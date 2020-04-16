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

const userRouter = require('./routes/User');
app.use('/user', userRouter);



// Start App & Port Determination
app.listen(5000, ()=> {
    console.log('express server started');
});