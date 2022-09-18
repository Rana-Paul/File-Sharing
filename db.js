require('dotenv').config()
const mongoose = require('mongoose')
const DB = process.env.DB_URL
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => {
    console.log("Connected")
}).catch((err) => {
    console.log(err)
})