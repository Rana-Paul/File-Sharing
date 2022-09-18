const mongoose = require('mongoose')

const File = new mongoose.Schema({
    path:{
        type: String,
        required: true
    },
    originalName:{
        type: String,
        required: true
    },
    password: String,
    downlodCount:{
        type: Number,
        required: true,
        default: 0
    }
})

//models

module.exports = mongoose.model("File",File)