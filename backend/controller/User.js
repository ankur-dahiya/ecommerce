const { userModel } = require("../model/User");

exports.fetchUserById = async (req,res)=>{
    const {id} = req.params;
    try{
        // we are only fetching required fields from db : name,email,id
        const user = await userModel.findById(id,"name email id role addresses orders");
        res.status(200).json(user);
    }
    catch(err){
        res.status(400).json(err);
    }
}

exports.updateUser = async (req,res)=>{
    const {id} = req.params;
    try{
        const user = await userModel.findByIdAndUpdate(id,req.body,{new:true});
        return res.status(200).json(user);
    }
    catch(err){
        return res.status(400).json(err);
    }
}