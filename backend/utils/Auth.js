const Admin = require('../models/Admin')
const jwt = require('jsonwebtoken')

const Auth = async (req, res, next) => {
    try {
        const decoded = jwt.verify(req.headers.authorization || req.body.token, 'secrethandshake')
        console.log(decoded)
        if(!decoded){
            res.status(401).json('Unauthorized')
        }

        const admin = await Admin.findOne({_id: decoded.id})

        if(!admin) {
            res.status(401).json('Unauthorized')
        }

        next()
    }

    catch(e){
        console.log(e)
        res.status(401).json('Unauthorized')
    }
    
}

module.exports = Auth