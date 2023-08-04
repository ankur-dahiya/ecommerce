const {productModel} = require("../model/Product");

exports.createProduct = async (req,res)=>{
    const product = new productModel(req.body);
    try{
        const doc = await product.save();
        return res.status(201).json(doc);
    }
    catch(err){
        return res.status(400).json(err);
    }
}

exports.fetchAllProducts = async (req,res)=>{
     // filter = {"category" : ["laptop","smartphone"]}
  // sort = {_sort:"price",_order:"desc"}
  // pagination = {_page=1,_limit=10}
  // todo : on server we will support multiple values
  // TODO: server will filter deleted products in case of non-admin
//   TODO: we have to try with multiple category and brands after change in front-end
    let condition={};
    // if user is not admin don't send deleted products
    if(!req.query.isAdmin){
        condition.deleted = {$ne:true}
    }
    let query = productModel.find(condition);
    let totalProductQuery = productModel.find(condition);
    if(req.query.category){
        query = query.find({category : req.query.category});
        totalProductQuery = totalProductQuery.find({category : req.query.category});
    }
    if(req.query.brand){
        query = query.find({brand : req.query.brand});
        totalProductQuery = totalProductQuery.find({brand : req.query.brand});
    }
    // TODO: How to get sort on discounted price not on actual price
    if(req.query._sort && req.query._order){
        query = query.sort({[req.query._sort]:[req.query._order]})
        totalProductQuery = totalProductQuery.sort({[req.query._sort]:[req.query._order]})
    }
    const totalDocs = await totalProductQuery.count().exec();
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
exports.fetchProductById = async (req,res)=>{
    const {id} = req.params;
    try{
        const product = await productModel.findById(id);
        return res.status(200).json(product);
    }
    catch(err){
        return res.status(400).json(err);
    }
}

exports.updateProduct = async (req,res)=>{
    const {id} = req.params;
    try{
        const product = await productModel.findByIdAndUpdate(id,req.body,{new:true});
        return res.status(200).json(product);
    }
    catch(err){
        return res.status(400).json(err);
    }
}