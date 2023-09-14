const express = require('express')
const mongoose = require('mongoose');
const router = express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')


router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner : req.user._id
    })
    try {
        const response = await task.save();
        res.status(201).send(response)
    }catch(err){
        res.status(400).send(err)
    }
})

router.get('/tasks', async (req, res) => {
    await Task.find({}).then((task) => {
        res.send(task)
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id
    await Task.findById(_id).then((task) => {
        if(!task){
            res.status(404).send('This type of task not found')
        }
        res.send(task)
    }).catch(err => {
        res.status(500).send(err)
    })
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send('Not valid update')
    }
    try
    {
        const task = await Task.findById(req.params.id)
        updates.forEach(update => task[update] = req.body[update])
        await task.save()
        
        if(!task){
            return res.status(404).send('This type of task not found')
        }
        res.send(task)
    }catch(err){
        return res.status(400).send(err)
    }
})

router.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if(!task){
            return res.status(404).send('Task not found')
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router;