const jwt = require('jsonwebtoken')
module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]
        const verify = jwt.verify(token,process.env.TOKEN_STRING)
        next()
    }
    catch(error){
        return res.json({
            message:"Invalid Token"
        })
    }
}