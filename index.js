const express = require('express')
const user = require('./route/user')
const cors = require('cors')

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/v1/user', user)

app.use('*', (req, res) => res.status(404).json({ error: "404 Page not found" }))

app.listen(5000, () => {
    console.log("Listening on port 5000")
})

module.exports = app