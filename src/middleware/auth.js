const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')
        const tokenarr = token.split(' ')
        
        const decoded = jwt.verify(tokenarr[1], process.env.JWT_SECRET)
        if(!decoded){
            throw Error('do not verify token')
        }
        const user = await User.findOne({_id : decoded._id, 'tokens.token':tokenarr[1]})
        if(!user){
            throw new Error('User not found')
        }
        req.token = tokenarr[1]
        req.user = user
        next()
    } catch (e){
         res.status(401).send({error : 'Please Authenticate'})
    }
}

module.exports = auth