const express = require('express')
const Applicant = require('../models/Applicant')
const auth = require('../utils/Auth')
const router = express.Router()

router.post('/ApplyForAService', async (req, res) => {
    try {
        await Applicant.create({
            applicantName: req.body.applicantName, 
            phoneNumber: req.body.phoneNumber,
            service: req.body.service,
            skills: req.body.skills,
            studyField: req.body.studyField,
            workField: req.body.workField,
            workType: req.body.workType,
            qualificationsRequired: req.body.qualificationsRequired 
        })

        res.status(201).json('Applied Successfully!')

    } catch (error) {
        res.status(400)
    }
})


router.get('/applicants', async (req, res) => {
    try {
        const applicants = await Applicant.find({}).sort([['_id', -1]]).limit(req.query.limit).skip(req.query.skip)
        res.status(200).json(applicants)

    } catch (error) {
        res.status(400)
    }
})

router.delete('/applicant/:id', async (req, res) =>  {
    try {
        const id = req.params.id
        await Applicant.findByIdAndDelete(id)
        res.status(200).json({message: 'deleted successfully'})
    } catch (error) {
        res.status(400).json({message: 'could not delete applicant data'})
    }
})


module.exports = router