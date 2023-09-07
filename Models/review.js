const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    userId:String,
    contentId:Number,
    rating:Number,
    review:String,
    date:String,
    
})

module.exports = mongoose.model('Review',reviewSchema);