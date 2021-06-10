const express = require('express')
const app = express()
const port = 80

let data = []

app.listen(port, () => {
    console.log('listening at port ' + port)
})
app.use(express.json({}))
app.use(express.static('public'))

app.post('/leaderboard', (request, response) => {
    console.log('I got a request')
    data.push(request.body)

    console.log(data)
    response.json(data)
})

app.get ('/leaderboard', (request, response) => {
    response.json(data)
})