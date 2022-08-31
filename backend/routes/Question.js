const express = require('express')
const Question = require('../models/Question')
const router = express.Router()
const auth = require('../utils/Auth')


router.get('/questions', async (req, res) => {

    try {
        const questions = await Question.find().sort([['_id', -1]]).limit(req.query.limit).skip(req.query.skip)
        res.status(200).json(questions)

    } catch (error) {
        res.status(400)
    }
})

router.post('/question', async (req, res) => {
try {
    const question = await Question.create({question: req.body.question})
    res.status(201).json(question)

} catch (error) {
    res.status(403).json('Invalid Credentials')
}

})


router.put('/question', auth, async (req, res) => {
    try {
        const question = await Question.findByIdAndUpdate(req.body.id, {
            answer: req.body.answer
        })
        res.status(201).json(question)
        
    } catch (error) {
        res.status(400)
    }
})

router.delete('/question', auth, async (req, res) => {
    try {
        await Question.findByIdAndDelete(req.body.id)
        res.status(200).json('Question Deleted')
    }
    catch (error) {
        res.status(400).json("Can't Delete Question")
    }
})

module.exports = router