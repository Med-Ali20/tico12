const express = require('express')
const Admin = require('../models/Admin')
const router = express.Router()


router.post('/sign-in', async (req, res) => {
try {
    const token = await Admin.confirmCredentials(req.body.adminName, req.body.password)
    res.status(200).json({token})

} catch (error) {
    res.status(403).json('Invalid Credentials')
}

})

module.exports = router