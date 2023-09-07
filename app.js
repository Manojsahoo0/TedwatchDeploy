const express = require('express');
require('dotenv').config()
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const userRouter = require('./Routes/user.js')
const watchRouter = require("./Routes/watchlist.js")
const reviewRouter = require('./Routes/review.js')
const PORT = process.env.PORT || 8000
const path = require('path'); // for deployment

const app = express();
app.use(cors())

mongoose.connect(process.env.DATABASE_URL)

mongoose.connection.on('error',(err)=>{
    console.log("error")
})
mongoose.connection.on('connected',()=>{
    console.log("connected")
})

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.use("/api/users",userRouter)
app.use("/api/watchlist",watchRouter)

app.use("/api/review", reviewRouter)

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "/Client/build")));
    
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'Client','build','index.html'))
    })
}
else{
    app.get("/", (req,res)=>{
        res.send("api running")
    })
}
app.listen(PORT,()=>console.log("App started"))