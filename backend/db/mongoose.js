const mongoose = require('mongoose')


const connect = async() => {
    try{
        const conn = await mongoose.connect("mongodb+srv://AhmedAli40:Med-ali@cluster0.d69ijjw.mongodb.net/")
        console.log(conn.connection.host)

    }
    catch(e){
        console.log(e)
    }
}

module.exports = connect
