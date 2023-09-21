const express = require('express')
require('./src/db/mongoose')

const app = express()
const port = process.env.PORT || 8080

const taskRouter = require('./src/routers/task.js')
const userRouter = require('./src/routers/user.js')

const multer = require('multer')
const upload = multer({
    dest : 'images'
})
app.post('/upload', upload.single('upload'), (req,res) => {
    res.send()
})

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, ()=>{
    console.log('server is running on port '+ port)
})

const Task = require('./src/models/task')
const User = require('./src/models/user')
