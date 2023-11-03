const proModel=require("../models/ProductModel");
const addProduct=async (req,res)=>{
    const requestBody = req.body;
    const url = req.protocol + '://' + req.get('host') + '/Images/' + req.file.filename
    const data={...requestBody,'imageURL':url}
    console.log(data)
    

    const product = new proModel(data)
    try {
        const savedProduct = await product.save();
        res.send({"err":0,"msg":"Product Added"}); 
    }  catch(ex) {
        return res.send({"err":1,"msg":ex.message});
    }
}
const getProducts=async (req,res)=>{
     try{
         const proData=await proModel.find();
         res.json({"err":0,"prodata":proData})
     }
     catch(err){
        res.json({"err":1,"msg":"Something Wrong"})
     }
}
const getSearchProducts=async (req,res)=>{
    let ser=req.params.ser;
    try{
        const proData=await proModel.find({name:ser});
        res.json({"err":0,"prodata":proData})
    }
    catch(err){
       res.json({"err":1,"msg":"Something Wrong"})
    }
}
const deleteProduct=async (req,res)=>{
     let pid=req.params.id;
     try{
          let del=await proModel.findByIdAndDelete(pid);
          res.json({"err":0,"msg":"product Deleted"})
     }catch(err){
        res.json({"err":1,"msg":"Something Wrong"})
     }
}
const updateProduct=(req,res)=>{

}
const getProductById=(req,res)=>{

}
module.exports={addProduct,getProductById,getProducts,deleteProduct,updateProduct,getSearchProducts}