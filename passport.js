const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/user');

cont cookieExtractor = req =>{
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}

//Authorization 
passport.use(new JwtStrategy({
    jwtFromRequest: cookieExtractor,
    secretOrKey: "oneil213"
},(payload,done)=>{
    User.findById({_id: payload.sub}, (err,user)=>{
        if(err)
            return done(err,false);
        if(user)
            return done(null,user);
        else
            return done(null,false);
    });
}));

// authentication local strategy using username and password
passport.use(new LocalStrategy((username, password, done)=>{
    User.findOne({username},(err,user)=>{
        // Something went Wrong with database
        if(err)
            return done(err);
        // if no user exist    
        if(!user)
            return done(null,false);
        // if user exist check if password is correct
    user.comparePassword(password,done)

    });
}));