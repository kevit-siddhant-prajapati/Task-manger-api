const mongoose = require('mongoose')

getDetails = async () => {
    await mongoose.connect('mongodb://localhost:27017/task-manager-api')
    const Schema = mongoose.Schema;
    
    const userSchema = new Schema({
        name : String,
        age : Number
      });
      
      // compile our model
      const User = mongoose.model('User', userSchema);
      
      // create a document
      const me = new User({
        name : 'Siddhant',
        age : '20'
        }
      );
      try {
        const response = await me.save();
        console.log(response)
      }catch(err){
        console.log(err)
      }
    
    
     
}
getDetails()