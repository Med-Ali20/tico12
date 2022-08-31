const express = require('express')
const multer = require('multer')
const Article = require('../models/Article')
const router = express.Router()
const upload = multer()
const sharp = require('sharp')
const auth = require('../utils/Auth')

router.post('/AddArticle', upload.array('images'), auth, async (req, res) => {
    try {
        const thumbnailBuffer = await sharp(req.files[0].buffer).resize({width: 400}).jpeg().toBuffer()
        const images =  req.files.slice(1, req.files.length)
        const imagesBuffer = await Promise.all(images.map( async (e) => {
             const image = await sharp(e.buffer).resize({width: 400}).jpeg().toBuffer();
             return image
            }))
        const newArticle = await Article.create({
            title: req.body.title,
            paragraph: req.body.paragraph,
            section: req.body.section,
            thumbnail: thumbnailBuffer,
            images: imagesBuffer,
            applyingAllowed: req.body.applyingAllowed
        })

        res.status(201).json(newArticle)
              
    } catch(e){ 
        res.status(400).json({message: 'could not upload '})
    }
})

router.get('/Articles/:section', async (req, res) => {
    try {
        const section = req.params.section
        const articles = section === 'cu' ? await Article.find({section: 'جامعة الطفل'}).sort( [['_id', -1]] ).limit(req.query.limit || 2).skip(req.query.skip || 0) : await Article.find({section: 'خدمات الحاضنة'}).sort( [['_id', -1]] ).limit(req.query.limit || 2).skip(req.query.skip || 0)
        const data = articles.map(article => {
            return {
                title: article.title,
                thumbnail: article.thumbnail,
                _id: article._id
            }
        })
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(400).json()
    }
})

router.get('/Article/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id)
        res.status(200).json(article)
    } catch(e) {
        res.status(400).json()
    }
})

router.put('/Article:id', auth, upload.single('thumbnail'), async (req, res) => {
    try {
        const updatedArticle = await Article.findOneAndUpdate({_id: req.params.id}, {
            title: req.body.title,
            paragraph: req.body.paragraph,
            section: req.body.section,
            thumbnail: req.file.buffer,
        })
        res.status(200).json(updatedArticle)
    } catch(e) {
        res.status(400).json()
    }
})

router.delete('/Article', auth, async (req, res) => {
    try {
        await Article.findOneAndDelete({_id: req.body.id})
        res.status(200)
    } catch (e) {
        res.status(400)
    }
})

module.exports = router