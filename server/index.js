const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")

const app = express()
const port = 4000

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req,res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.send("recieveth")
})

app.post('/', (req, res) => {
    res.send("Post message")
})

app.get('/' , (req, res) => res.send("Hello World"))
app.listen(port, () => console.log(`Example app listening on port ${port}`))