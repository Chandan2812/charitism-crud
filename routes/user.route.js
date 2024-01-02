const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const {UserModel}=require("../models/user.model")
require("dotenv").config()

const userRouter=express.Router()

userRouter.post("/signup", async (req, res) => {
    try {
      const { username, password } = req.body;

      const isUserPresent = await UserModel.findOne({ username });
  
      if (isUserPresent) {
        return res.status(400).send({ msg: "User already present" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = new UserModel({ username, password: hashedPassword });
  
      await user.save();
      res.status(201).send({ msg: "Registration successful", user });
    } catch (error) {
      console.error(error);
      res.status(500).send({ msg: "Something went wrong during registration" });
    }
  });


userRouter.post("/login",async (req,res)=>{
    try {
        const {username,password}=req.body

        const isUserPresent=await UserModel.findOne({username})
        if(!isUserPresent)
        {
            return res.send({msg:"user not present"})
        }

        const isPasswordMatch=await bcrypt.compare(password,isUserPresent.password)
        if(!isPasswordMatch)
        {
            return res.send({msg:"wrong credentials"})
        }

        const token=jwt.sign({userId:isUserPresent._id},process.env.SECRET,{expiresIn:"4h"})
        res.send({msg:"Login Successful",token:token,user:isUserPresent})
    } catch (error) {
        res.send({msg:"something went wrong"}) 
    }
})


module.exports={userRouter}