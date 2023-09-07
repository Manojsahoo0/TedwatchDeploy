const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const review = require("../Models/review.js")
const authenticateJWT = require('../Middleware/auth.js')

router.get("/:id",authenticateJWT,(req,res)=>{
    let id=req.params.id
    review.find({contentId:id})
    .then((result)=>{
        res.send(result)
    })
})

router.post("/",authenticateJWT,(req,res)=>{

    if(!req.body.review){
        res.status(200).json({message:"No reviews added"})
    }
    else{
        review.find({userId:req.body.userId,contentId:req.body.contentId})
        .exec()
        .then(reviewList=>{
            if(reviewList.length>0){
                res.status(200).json({message:"User Already added the review"})
            }
            else{
                const newReview = new review({
                    _id:new mongoose.Types.ObjectId,
                    name:req.body.name,
                    userId:req.body.userId,
                    contentId:req.body.contentId,
                    rating:req.body.rating,
                    review:req.body.review,
                    date: new Date().toLocaleString()
                })
                newReview.save()
                .then((result)=>{
                    res.status(200).json({
                        message:"Review added successfully"
                    })
                })
                .catch((err)=>{
                    res.status(500).json({
                        message:"Error occurred"
                    })
                })
            }
        })
        
    }
})

module.exports = router;