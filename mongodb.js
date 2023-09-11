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
         let collection = db.collection('user')
         
         collection.updateOne({
            _id : new ObjectID('64f857c437407833fdf31c03')
         }, {
            $inc : {
               age : 2
            }
         }).then((result) => console.log(result))
         .catch((err) => console.log('Unable to upadate result'+err))
   }  
   catch(err){
      console.log(err)
   }
   
}


getData()
