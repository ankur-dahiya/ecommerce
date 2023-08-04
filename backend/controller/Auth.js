const { userModel } = require("../model/User");

exports.createUser = async (req,res)=>{
    const user = new userModel(req.body);
    try{
        const savedUser = await user.save();
        res.status(201).json({id:savedUser.id,role:savedUser.role});
    }
    catch(err){
        res.status(400).json(err);
    }
}
exports.loginUser = async (req,res)=>{
    try{
        const user = await userModel.findOne({email: req.body.email});
        // this is just temporary, later we will use strong password auth
        if(!user){
            res.status(401).json({message:"User not found"})
        }
        else if(user.password===req.body.password){
            res.status(201).json({id:user.id,role:user.role});
        }
        else{
            res.status(401).json({message:"Invalid credentials"});
        }
    }
    catch(err){
        res.status(400).json(err);
    }
}