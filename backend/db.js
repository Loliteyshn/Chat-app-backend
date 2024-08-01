const mongoose = require("mongoose");
const uri = 'mongodb+srv://lolitaculiuc19:D1UeKLnT9o0NPAIw@cluster0.dlnwwso.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const connectDb = async() => {
    try {
        const connection = await mongoose.connect(uri)
        console.log('Conected to MongoDB')

    } catch (err) {
        console.log(`DB error: ${err}`);
    }
}

module.exports = connectDb;