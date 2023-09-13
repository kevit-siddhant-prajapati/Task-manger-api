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

// myPassword = async () => {
//     const mypass = 'riya12785'
//     const hashPass = '$2b$08$f7sd.8stZNrGTv1yo4ob.O4JHFL6JDUCH.0CFFLc5Px1kjUe3BB1m'
//     const hashPass1 = await bcrypt.hash(mypass, 8)
//     console.log(mypass)
//     console.log(hashPass)
//     console.log(hashPass1)
//     const isMatch = await bcrypt.compare(mypass, hashPass1)
//     console.log(isMatch)
// }
// myPassword()