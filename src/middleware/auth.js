const jwt = require('jsonwebtoken')
const User = require('../models/user')

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')
        console.log(token)
        
        const decoded = jwt.verify(token, 'thisismynewcourse')
        console.log(decoded)
        if(!decoded){
            throw Error('do not verify token')
        }
        const user = await User.findOne({_id : decoded._id, 'tokens.token':token})
        if(!user){
            throw new Error()
        }
        req.user = user
        next()
    } catch (e){
        res.status(401).send({error : "please authenticate"})
    }
}

module.exports = auth