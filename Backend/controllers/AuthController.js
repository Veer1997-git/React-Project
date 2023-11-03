const userModel=require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt=require("jsonwebtoken");
const SecretKey="asd!@#567ASDDDD"
const saltRounds = 10;
const loginUser=async (req,res)=>{
   let email=req.body.email;
   let password=req.body.password;
   try{
   let user=await userModel.findOne({email:email})
   let dbpass=user.password;
   if(bcrypt.compareSync(password, dbpass)){
      const userData={
        email:email,
        isAdmin:user.role=="admin"?true:false
      };
      const token=jwt.sign(userData,SecretKey,{expiresIn:"2h"})
    res.json({"err":0,"msg":"Login Successfull","token":token});
       }
       else{
        res.json({"err":1,"msg":"Enter correct email or password"});
       }
   }
   catch(err){
    res.json({"err":1,"msg":"Enter correct email or password"});
   }
   
}
const registerUser=async (req,res)=>{
    let email=req.body.email;
    let password=req.body.password;
    const hashPassword = bcrypt.hashSync(password, saltRounds);
    let firstName=req.body.firstName;
    let lastName=req.body.lastName;
    let age=req.body.age;
    try{
        let regData=new userModel({email:email,password:hashPassword,firstName:firstName,lastName:lastName,age:age});
        await regData.save();
        res.json({"err":0,"msg":"User Registered"})
    }
    catch(err){
        res.json({"err":1,"msg":"Something wrong or already registered"});
    }
    
}
module.exports={loginUser,registerUser};