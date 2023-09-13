const express = require('express')
require('./src/db/mongoose')
const bcrypt = require('bcrypt')

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

myPassword = async () => {
    const mypass = 'were2r4'
    const hashPass = await bcrypt.hash(mypass, 8)
    console.log(mypass)
    console.log(hashPass)
    const isMatch = await bcrypt.compare(mypass, hashPass)
    console.log(isMatch)
}
myPassword()