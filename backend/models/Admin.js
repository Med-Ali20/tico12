const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const adminSchema = mongoose.Schema({
    adminName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String
    }
})

const Admin = mongoose.model('Admin', adminSchema)

Admin.confirmCredentials = async function(adminName, password) {
    const admin = await Admin.findOne({adminName, password}) 

    if(!admin){
        throw new Error({message:'Invalid Credentials'})
    }

    const token = jwt.sign({id: admin._id}, 'secrethandshake')

    return token
}

module.exports = Admin