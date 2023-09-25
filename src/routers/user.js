const express = require('express')
const router = express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const Task = require('../models/task')

const sharp = require('sharp')
const {sendWelcomeEmail, sendGoodbyeEmail} = require('../emails/account')
const multer = require('multer')
const upload = multer({
    limits : {
        fileSize :1000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)){
            return cb(new Error('Only images allowed .'))
        }
        cb(undefined, true);
    }
})

router.post('/users', async (req,res)=> {
    const user = new User(req.body)
    try {
        const response1 = await user.save();
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        
        res.status(201).send({ response1  , token})
      }catch(err){
        res.status(400)
        res.send(err)
      }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        if(!user){
            throw Error('Invalid username or password')
        }
        const token = await user.generateAuthToken()
        res.send({user: user.getPublicProfile(), token})
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/users', auth ,async (req, res) => {
    try{
        const users = await User.find({})
        const newuser =users.map(user => {
            const userObject = user.toObject()
            delete userObject.password
            delete userObject.tokens
            delete userObject.avatar
            return userObject
        })
        res.send(newuser)
    }catch(e){
        res.status(500).send()
    }
    
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user.getPublicProfile())
})

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async(req, res)=> {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})



router.get('/users/:id', async (req, res) => {
    const _id = req.params.id
    await User.findById(_id).then((user)=> {
        if(!user){
            res.status(404).send('This type of user not found')
        }
        res.send(user)
    }).catch(err=> {
        res.status(500).send(err)
    })
})

router.patch('/users/me',auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'password']
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send('Not valid update')
    }
    try
    {
        updates.forEach(update => {
            req.user[update] = req.body[update]
        })
        await req.user.save()
        if(!req.user){
            return res.status(404).send('This type of user not found')
        }
        res.send(req.user.getPublicProfile())
    }catch(err){
        return res.status(400).send(err)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        sendGoodbyeEmail(user.email, user.name)
        if(!user){
            return res.status(404).send('User not found')
        }
        await Task.deleteMany({ owner : user._id })
        await User.deleteOne({_id : user._id})
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

router.post('/users/me/avatar',auth, upload.single('avatar'), async (req,res) => {
    const buffer = await sharp(req.file.buffer).resize({width :250 , height : 250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error, req, res,next)=> {
    res.status(400).send({error : error.message})
})

router.delete('/users/me/avatar' , auth, async (req,res)=> {
    req.user.avatar =undefined
     await req.user.save()
     res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-Type', 'image/png')
        
        res.send(user.avatar)
    } catch(e){
        req.status(404).send()
    }
})

module.exports =router;