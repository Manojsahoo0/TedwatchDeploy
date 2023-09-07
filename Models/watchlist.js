const mongoose = require('mongoose');

const watchlistSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    userId:String,
    movieId:Number,
    title:String,
    poster_path:String,
    media:String,
    
})

module.exports = mongoose.model('Watchlist',watchlistSchema);