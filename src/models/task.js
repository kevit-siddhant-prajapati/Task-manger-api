const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const taskSchema = new Schema({
    description : {
        type : String,
        required : true,
        trim :true
    },
    completed : {
        type : Boolean,
        default : false
    },
    owner : {
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    }
  },{
    timestamps :true
  })

taskSchema.pre('save', async function(next) {
    const task = this
    console.log('before task is saving!')
    next()
})

  const Task = mongoose.model('Task', taskSchema)
  module.exports = Task;