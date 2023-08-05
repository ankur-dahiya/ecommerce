const { userModel } = require("../model/User");
const crypto = require("crypto");
const { sanitizeUser } = require("../services/common");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "SECRET_KEY";

exports.createUser = async (req,res)=>{
    try{
        const salt = crypto.randomBytes(16);
        crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', async function(err, hashedPassword){
            
            const user = new userModel({...req.body,password:hashedPassword,salt});
            const savedUser = await user.save();
            //imp: req.login(argument) it sends the argument to serializer that sets this value to req.user
            // it doesn't verify id and pass just directly set the values to req.user
            // use this function after signup to login the user
            req.login(sanitizeUser(savedUser),(err)=>{
                if(err){
                    res.status(400).json(err);
                }
                else{
                    const token = jwt.sign(sanitizeUser(savedUser),SECRET_KEY);
                    res.status(201).cookie('jwt', token, { expires: new Date(Date.now() + 3600000), httpOnly: true }).json(req.user);
                }
            });
        })
    }
    catch(err){
        res.status(400).json(err);
    }
}
exports.loginUser = async (req,res)=>{
    //req.user is created by passport.js after user is authenticated
    // TODO: we'll need token to set as cookie on front end
    res.status(200).cookie('jwt', req.user.token, { expires: new Date(Date.now() + 3600000), httpOnly: true }).json(req.user);
}
exports.checkAuth = async (req,res)=>{
    if(req.user){
        res.status(200).json(req.user);
    }
    else{
        res.sendStatus(500);
    }
}