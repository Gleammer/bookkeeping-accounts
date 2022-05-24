const express = require('express')
const dotenv = require('dotenv')
const port = process.env.SERVER_PORT || 5000

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => res.send({message: "Basic express dev environment."}))

app.listen(port, () => console.log(`Server started on port ${port}`))