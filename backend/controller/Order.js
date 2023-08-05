const { orderModel } = require("../model/Order");

exports.fetchOrdersByUser = async (req,res)=>{
    const {id} = req.user;
    try{
        const orders = await orderModel.find({user:id});
        res.status(200).json(orders);
    }
    catch(err){
        res.status(400).json(err);
    }

}

exports.createOrder = async (req,res)=>{
    const {id} = req.user;
    const order = new orderModel({...req.body,user:id});
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

exports.fetchAllOrders = async (req,res)=>{
   let query = orderModel.find({deleted:{$ne:true}});
   let totalOrdersQuery = orderModel.find({deleted:{$ne:true}});
   
   if(req.query._sort && req.query._order){
       query = query.sort({[req.query._sort]:[req.query._order]})
       totalOrdersQuery = totalOrdersQuery.sort({[req.query._sort]:[req.query._order]})
   }
   const totalDocs = await totalOrdersQuery.count().exec();
   if(req.query._page && req.query._limit){
       const pageSize = req.query._limit;
       const page =req.query._page;
       query = query.skip(pageSize*(page-1)).limit(pageSize);
   }
   
   try{
       // console.log(query);
       const docs = await query.exec();
       res.set("X-Total-Count",totalDocs);
       return res.status(201).json(docs);
   }
   catch(err){
       return res.status(400).json(err);
   }
}