const mongoose = require('mongoose');

getDetailUsers = async () => {
    await mongoose.connect('mongodb://localhost:27017/task-manager-api')
}

getDetailUsers()
