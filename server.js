require('./db')
const multer = require('multer')
const express = require("express")
const app = express()
const mongoose = require('mongoose')
const upload = multer({ dest: "uploads" })
const bcrypt = require('bcrypt')
const File = require('./models/File')

const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))

app.set("view engine", "ejs")


app.get("/", (req, res) => {
    res.render("index")
})

app.post("/upload", upload.single("file"), async (req, res) => {

    const fileData = {
        path: req.file.path,
        originalName: req.file.originalname,

    }
    if (req.body.password != null && req.body.password !== "") {
        fileData.password = await bcrypt.hash(req.body.password, 10)

    }

    const file = await File.create(fileData)

    res.render("index", { fileLink: `${req.headers.origin}/file/${file.id}` })

})
app.route("/file/:id").get(handelDownload).post(handelDownload)

    
async function handelDownload(req, res) {

    const file = await File.findById(req.params.id)

    if (file.password != null) {
        if (req.body.password == null) {
            res.render("password")
            return
        }

        if (!(await bcrypt.compare(req.body.password, file.password))) {
            res.render("password", { error: true })
            return
        }
    }

    file.downlodCount++
    await file.save()

    res.download(file.path, file.originalName)


}

app.listen(port)