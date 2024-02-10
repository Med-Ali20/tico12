const path = require('path')
const express = require('express')
const connect = require('./db/mongoose')
const articleRouter = require('./routes/Article')
const applicantRouter = require('./routes/Applicant')
const adminRouter = require('./routes/Admin')
const questionsRouter = require('./routes/Question')
const cors = require('cors')
require('dotenv').config()

const port = process.env.PORT || 5000

const app = express()
connect()

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use('/Article', articleRouter)
app.use('/Applicant', applicantRouter)
app.use('/Admin', adminRouter)
app.use('/Questions', questionsRouter)


app.get('*', (req, res) =>
res.sendFile(
  path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
))




app.listen(port)
