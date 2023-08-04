const { orderModel } = require("../model/Order");

exports.fetchOrdersByUser = async (req,res)=>{
    const {user} = req.query;
    try{
        const orders = await orderModel.find({user});
        res.status(200).json(orders);
    }
    catch(err){
        res.status(400).json(err);
    }

}

exports.createOrder = async (req,res)=>{
    const order = new orderModel(req.body);
    try{
        const doc = await order.save();
        return res.status(201).json(doc);
    }
    catch(err){
        return res.status(400).json(err);
    }
}

// not used in frontend
exports.deleteOrder = async (req,res)=>{
    const {id} = req.params;
    try{
        const order = await orderModel.findByIdAndDelete(id);
        return res.status(200).json(order);
    }
    catch(err){
        return res.status(400).json(err);
    }
}

exports.updateOrder = async (req,res)=>{
    const {id} = req.params;
    try{
        const order = await orderModel.findByIdAndUpdate(id,req.body,{new:true});
        return res.status(201).json(order);
    }
    catch(err){
        return res.status(400).json(err);
    }
}