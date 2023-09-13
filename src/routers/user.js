const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const userSchema = require('../models/user')
const User = mongoose.model('User', userSchema)

router.post('/users', async (req,res)=> {
    const user = new User(req.body)
    try {
        const response1 = await user.save();
        res.status(201).send(response1)
      }catch(err){
        res.status(400)
        res.send(err)
      }
})

router.get('/users', async (req, res) => {
    await User.find({}).then((users) => {
        res.send(users)
    }).catch((err) => {
        res.status(500).send(err)
    })
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

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'age', 'password']
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send('Not valid update')
    }
    try
    {
        const user=await User.findByIdAndUpdate(req.params.id , req.body, {new: true, runValidators: true})
        if(!user){
            return res.status(404).send('This type of user not found')
        }
        res.send(user)
    }catch(err){
        return res.status(400).send(err)
    }
})

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            return res.status(404).send('User not found')
        }
        res.send(user)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports =router;