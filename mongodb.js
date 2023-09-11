//crud create read update delete

const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient
const ObjectID = mongodb.ObjectId

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
// console.log(id.toString())
// console.log(id.getTimestamp())
getData = async () =>  {
   try {
         let result = await MongoClient.connect(connectionURL)
         if(!result){
            throw Error('Connection not stablish with database')
         }
         let db = result.db(databaseName)
         let collection = db.collection('tasks')
         
         collection.deleteOne({
            description : 'Javascript'
         }).then((result) => console.log(result))
         .catch((err) => console.log('Unable to delete result'+err))
   }  
   catch(err){
      console.log(err)
   }
   
}


getData()
