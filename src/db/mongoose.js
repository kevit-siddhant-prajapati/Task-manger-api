const mongoose = require('mongoose');

getDetailUsers = async () => {
    await mongoose.connect(process.env.MONGODB_URL)
}

getDetailUsers()
