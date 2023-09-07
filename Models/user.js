const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:String,
    // lastname:String,
    phone:Number,
    // dob:Date,
    email:String,
    password:String,
})

module.exports = mongoose.model('Users',userSchema);