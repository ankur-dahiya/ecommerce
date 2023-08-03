const express = require("express");
const server = express();
const {createProduct} = require("./controller/Product");
const mongoose = require("mongoose");
const productsRouter = require("./routes/Products");
const brandsRouter = require("./routes/Brands");
const categoriesRouter = require("./routes/Categories");
const cors = require("cors");

server.use(express.json()); //to parse req.body
server.use(cors({
    exposedHeaders:["X-Total-Count"]
}));
server.use("/products",productsRouter.router);
server.use("/brands",brandsRouter.router);
server.use("/categories",categoriesRouter.router);


main().catch((err)=>{
    console.log("mongoose "+err);
})

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");
    console.log("mongoose connected");
}


server.get("/",(req,res)=>{
    res.json({status:"success"});
})

server.post("/products",createProduct);

server.listen(8080,()=>{
    console.log("server started");
})