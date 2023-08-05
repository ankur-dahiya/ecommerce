const passport = require("passport");

exports.isAuth = (req,res,next)=>{
    return passport.authenticate("jwt");
}

exports.sanitizeUser = (user)=>{
    return {id:user.id,role:user.role};
}

//token extractor from cookie
exports.cookieExtractor = (req)=>{
    let token = null;
    if (req && req.cookies) { //to access req.cookies cookie-parser middleware is needed
        token = req.cookies['jwt']; //jwt is cookie name
    }
    // for testing purpose only
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2UxNTRmMGNiODc2ODUwMTNiYmEwOSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5MTIyNzg0Mn0.Squ118wldc-9guTVbFDjnGJ8PKBQoJC7QLA86cygSSQ";
    return token;
};