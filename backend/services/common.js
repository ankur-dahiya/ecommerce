const passport = require("passport");
const nodemailer = require("nodemailer");

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
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Y2UxNTRmMGNiODc2ODUwMTNiYmEwOSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5MTMwMDA3M30.WzDfgpTZHQhNH57RZSt22Z_hKu63xxwqSJcmqqgu2HE";
    return token;
};

// Email
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD
    }
  });


//we dont want external access to mail
exports.sendMail = async ({to,subject,text,html})=>{
    try{
        const info = await transporter.sendMail({
            from: `"E-commerce" <${process.env.SMTP_EMAIL}>`, // sender address
            to, // list of receivers
            subject, // Subject line
            text, // plain text body
            html, // html body
          });
          return info;
    }
    catch(err){
        return err;
    }
  }