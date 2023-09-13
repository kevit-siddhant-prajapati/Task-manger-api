const express = require('express')
require('./src/db/mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()
const port = process.env.PORT || 3000

const taskRouter = require('./src/routers/task.js')
const userRouter = require('./src/routers/user.js')

// app.use((req, res, next)=> {
//     if(req.method ==='GET'){
//         res.send('Get request is disable')
//     } else {
//         next()
//     }
// })

// app.use((req, res, next) => {
//     res.status(503).send('Your site is under maintance')
//     next()
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

app.listen(port, ()=>{
    console.log('server is running on port '+ port)
})

myFunction = async () => {
    const token = jwt.sign({ _id: '650154acd7274c985593855f' }, 'thisismynewcourse', { expiresIn: '7 days' })
    console.log(token)

    const data = jwt.verify(token, 'thisismynewcourse')
    console.log(data)
}
myFunction()