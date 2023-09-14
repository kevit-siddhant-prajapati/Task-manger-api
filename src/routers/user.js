const express = require('express')
const router = express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const mongoose = require('mongoose');
const Task = require('../models/task')

router.post('/users', async (req,res)=> {
    const user = new User(req.body)
    try {
        const response1 = await user.save();
        const token = await user.generateAuthToken()
        res.status(201).send({response1, token})
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
        res.send(users)
    }catch(e){
        res.status(500).send()
    }
    
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

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user.getPublicProfile())
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
        //const user=await User.findByIdAndUpdate(req.params.id , req.body, {new: true, runValidators: true})
        if(!req.user){
            return res.status(404).send('This type of user not found')
        }
        res.send(req.user)
    }catch(err){
        return res.status(400).send(err)
    }
})

router.delete('/users/me', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        if(!user){
            return res.status(404).send('User not found')
        }
        await Task.deleteMany({ owner : user._id })
        await User.deleteOne({name : user.name})
        res.send(req.user)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports =router;