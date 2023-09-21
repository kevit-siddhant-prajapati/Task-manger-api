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

//GET /tasks?completed=true
router.get('/tasks', auth, async (req, res) => {
    const match = {}

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }
    try {
        await req.user.populate({
            path:'tasks',
            match,
            options : {
                limit : parseInt(req.query.limit),
                skip : parseInt(req.query.skip)
            }
        })
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send(e)
    }
    

    
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task){
            return res.status(404).send('This type of task not found')
        } 
        res.send(task)
    } catch(e){
        res.status(500).send()
    }
    
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidUpdate = updates.every(update => allowedUpdates.includes(update))
    if(!isValidUpdate){
        return res.status(400).send('Not valid update')
    }
    try
    {
        const task = await Task.findOne({_id: req.params.id, owner : req.user._id})
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

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        const task = await Task.findOneAndRemove({_id : req.params.id, owner : req.user._id})
        if(!task){
            return res.status(404).send('Task not found')
        }
        res.send(task)
    }catch(e){
        res.status(500).send(e)
    }
})

module.exports = router;