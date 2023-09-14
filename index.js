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

const pet = {
    name : 'Hal'
}

pet.toJSON = function (){
    console.log(this)
    return this
}
console.log(JSON.stringify(pet))