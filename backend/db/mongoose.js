const mongoose = require('mongoose')


const connect = async() => {
    try{
        const conn = await mongoose.connect("mongodb+srv://Ali12:RealNigga@cluster0.w4aqh.mongodb.net/myFirstDatabase")
        console.log(conn.connection.host)

    }
    catch(e){
        console.log(e)
    }
}

module.exports = connect