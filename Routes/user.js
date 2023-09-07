const express = require('express');
const mongoose = require('mongoose');
const user = require('../Models/user.js');
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

router.get("/",(req,res)=>{
    user.find()
    .then((result)=>{
        res.send(result)
    })
})
router.put("/:id",(req,res)=>{
    let id = req.params.id
    user.updateOne({id},{$set:{contact:req.body.mobile}})
    
    .then((result)=>{
        res.send(result)
    })
})

router.get("/:id",(req,res)=>{
    let id = req.params.id
    user.findById(id)
    .then((result)=>{
        res.send(result)
    })
})

router.post("/",(req,res)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
            return res.status(500).json({
                error:err
            })
        }
        else{
            const newUser = new user({
                _id:new mongoose.Types.ObjectId,
                name:req.body.name,
                // lastname:req.body.lastname,
                phone:req.body.phone,
                // dob:req.body.dob,
                email:req.body.email,
                password:hash,
        
            })
            newUser.save()
            .then((result)=>{
                res.status(200).json({
                    message:"User created successfully"
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    message:"Error Occured"
                })
            })
        }
    })

})

router.post("/login",(req,res)=>{
    user.find({email:req.body.email})
    .exec()
    .then(user=>{
        if(user.length<1){
            res.status(400).json({
                message:"Invalid Username"
            })
        }

            bcrypt.compare(req.body.password,user[0].password,(err,result)=>{
                if(!result){
                    res.status(400).json({
                        message:"Invalid Password"
                    })
                }
                if(result){
                    const accessToken = jwt.sign({
                        email:user[0].email,
                        name:user[0].name,
                        // lastname:user[0].lastname,
                        phone:user[0].phone,
                        // dob:user[0].dob
                    },
                    process.env.TOKEN_STRING,
                    {
                        expiresIn:"6h"
                    })
                    res.json({
                        id:user[0]._id,
                        email:user[0].email,
                        name:user[0].name,
                        // lastname:user[0].lastname,
                        phone:user[0].phone,
                        // dob:user[0].dob,
                        token:accessToken
                    })
                }
            })
        
    })
    .catch((err)=>{
        res.json({
            message:"Error"
        })
    })
})

module.exports = router;