const mongoose = require('mongoose')


const connect = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log(conn.connection.host)

    }
    catch(e){
        console.log(e)
    }
}

module.exports = connect