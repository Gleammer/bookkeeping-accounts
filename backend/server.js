const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const connectDB = require('./config/connectDB')
const port = process.env.SERVER_PORT || 5000

connectDB()

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/v1.0/accounts', require('./routes/accountRoutes'))
app.use('/api/v1.0/rules', require('./routes/ruleRoutes'))

app.get('/', (req, res) => res.send({message: "Basic express dev environment."}))

app.listen(port, () => console.log(`Server started on port ${port}`))