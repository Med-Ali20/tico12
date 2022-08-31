const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    paragraph:{
        type: String,
        required: true
    },
    images:[
        Buffer
    ]
    ,
    thumbnail : {
        type: Buffer,
        required: true
    },
    section: {
        type: String,
        required: true,
    },
    applyingAllowed: {
        type: Boolean
    }
},{
    timestamps: true
})

const Article = mongoose.model('Article', articleSchema)

module.exports = Article