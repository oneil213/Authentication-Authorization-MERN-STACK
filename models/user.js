const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');



let enu = {
    values: ['user', 'admin'],
   message: 'Role is invalid'
  };

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: 4,
        max: 15
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: enu,
        required: true
    },

    todos: [{type: mongoose.Schema.Types.ObjectId, ref: 'Todo'}]
});

// hash password before saving into database

userSchema.pre('save', function(next){
    if(!this.isModified('password'))
    return next();
    bcrypt.hash(this.password,10,(err,passwordHash)=>{
        if(err)
        return next(err);
        this.password = passwordHash;
        next();
    });
});

userSchema.methods.comparePassword = function(password,cb){
    bcrypt.compare(password, this.password, (err, isMatch)=>{
        if(err)
            return cb(err);
        else{
            if(!isMatch)
                 return cd(null,isMatch);
            return cb(null,this);
        }    
    });
}

module.exports = mongoose.model('User', userSchema);