const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex : true
})

const User = mongoose.model('User', {
    name : {
        type: String
    },
    age: {
        type: Number
    }
})

const me = new User({
    name: 'Siddhant',
    age: 20
})

me.save().then(()=>{
    console.log(me)
}).catch((error)=> console.log(error))