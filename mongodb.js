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
         let response = await collection.findOne({_id : new ObjectID('64fe9aa55a5aea0f52da4824')})
         let response1 = await collection.find({completed : false}).toArray()
         if(!response){
            throw Error('Unable to fetch')
         }
         console.log(response)

         if(!response1){
            throw Error('Unable to fetch')
         }
         console.log(response1)
      
   }  
   catch(err){
      console.log(err)
   }
   
   
}


getData()
