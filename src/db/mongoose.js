const mongoose = require('mongoose');
const { boolean } = require('yargs');

getDetails = async () => {
    await mongoose.connect('mongodb://localhost:27017/task-manager-api')
    const Schema = mongoose.Schema;
    
    const taskSchema = new Schema({
        description : String,
        completed : Boolean
      });
      
      // compile our model
      const Tasks = mongoose.model('Tasks', taskSchema);
      
      // create a document
      const task = new Tasks({
        description : 'Javascript work',
        completed : false
        }
      );
      try {
        const response = await task.save();
        console.log(response)
      }catch(err){
        console.log(err)
      }
    
    
     
}
getDetails()