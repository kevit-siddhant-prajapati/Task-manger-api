const mongoose = require('mongoose');
const { boolean } = require('yargs');
const validator = require('validator')

getDetailUsers = async () => {
    await mongoose.connect('mongodb://localhost:27017/task-manager-api')
    const Schema = mongoose.Schema;
    const userSchema = new Schema({
        name : {
            type : String,
            required: true
        },
        email : {
            type : String,
            require: true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error('Email is invalid')
                }
            }
        },
        age : {
            type : Number,
            validate(value) {
                if(value < 0){
                    throw new Error('Age must be a positive Number')
                }
            }
        }
      });

      const User = mongoose.model('User', userSchema);
      
      // create a document
      const me = new User({
            name : 'Raman',
            age : 22,
            email : 'raj124@gmail.'
        }
      );
      try {
        const response = await me.save();
        console.log(response)
      }catch(err){
        console.log(err)
      }

      const taskSchema = new Schema({
        description : String,
        completed : Boolean
      })

      // compile our model
      const Tasks = mongoose.model('Tasks', taskSchema);
      
      // create a document
      const task = new Tasks({
        description : 'Javascript work',
        completed : false
        }
      );
      try {
        const response1 = await task.save();
        console.log(response1)
      }catch(err){
        console.log(err)
      }
     
}

getDetailUsers()
