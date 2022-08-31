const mongoose = require('mongoose')

const applicantSchema = mongoose.Schema({
    applicantName: {
        type: String, 
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    service: {
        type: String, 
        required: true
    },
    studyField: {
        type: String
    },
    skills: {
        type: String
    },
    workField: {
        type: String
    },
    qualificationsRequired: {
        type: String
    },
    workType: {
        type: String
    }
}, {
    timestamps: true
})

const Applicant = mongoose.model('Applicant', applicantSchema)

module.exports = Applicant