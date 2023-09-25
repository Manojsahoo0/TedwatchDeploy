const express = require('express');
const mongoose = require('mongoose');
const Watchlist = require('../Models/watchlist.js');
const authenticateJWT = require('../Middleware/auth.js')
const router = express.Router()

router.post("/",authenticateJWT,(req,res)=>{
    Watchlist.find({userId:req.body.userId,movieId:req.body.movieId})
    .exec()
    .then(watchlistItem=>{
        if(watchlistItem.length<1){
            const newWatchlist = new Watchlist({

                _id:new mongoose.Types.ObjectId,
                name:req.body.name,
                userId:req.body.userId,
                movieId:req.body.movieId,
                title:req.body.title,
                poster_path:req.body.poster_path,
                media:req.body.media,
            })
            newWatchlist.save()
            .then((result)=>{
                res.status(200).json({
                    newWatchlistItem:result
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    newWatchlistItem:err
                })
            })
        }
        else{
            Watchlist.deleteOne({movieId:req.body.movieId})
            .exec()
            res.status(404).json({
                message:"Removed from watchlist"
            })
        }
    })
    
})

router.delete("/",authenticateJWT,(req,res)=>{
    Watchlist.deleteOne({userId:req.body.userId,movieId:req.body.movieId})
            .exec()
            res.status(200).json({
                message:"Removed from watchlist"
            })
})

router.get("/:id",authenticateJWT,(req,res)=>{
    let id = req.params.id
  Watchlist.find({userId:id})
  .exec()
  .then(data=>{
    data.length>0?res.status(200).send(data):res.status(200).json({message:"No Data found"})
  })
    
})

module.exports = router