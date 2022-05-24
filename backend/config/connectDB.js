const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB connected on host: ${connection.connection.host}`)
    } catch(err) {
        console.warn(err)
        process.exit(1)
    }
}

module.exports = connectDB