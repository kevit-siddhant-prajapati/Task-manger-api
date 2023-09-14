const express = require('express')
require('./src/db/mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
const port = process.env.PORT || 3000

const taskRouter = require('./src/routers/task.js')
const userRouter = require('./src/routers/user.js')


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, ()=>{
    console.log('server is running on port '+ port)
})

const Task = require('./src/models/task')
const User = require('./src/models/user')

// const main = async () => {
//     // const task = await Task.findById('6502b2c9c3f8af0c59959b95')
//     // await task.populate('owner')
//     // console.log(task.owner.name)

//     const user = await User.findById('6502b241c3f8af0c59959b81')
//     await user.populate('tasks')
//     console.log(user.tasks)
// }
// main()