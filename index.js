const express = require('express')
const app = express()
const Datastore = require('nedb')
const port = 80

const database = new Datastore('./leaderboard.db')
database.loadDatabase()

app.listen(port, () => {
    console.log('listening at port ' + port)
})
app.use(express.json({}))
app.use(express.static('public'))

app.post('/leaderboard', (request, response) => {
    console.log('I got a request')

    const answersIndex = [3, 3, 2, 3, 0]
    const userIndexes = request.body.answersIndex
    const rightAnswers = checkRightAnswers(answersIndex, userIndexes)

    const user = {
        name: request.body.name,
        answersIndex: userIndexes,
        rightAnswers: rightAnswers
    }

    database.insert(user)

    response.json(user)
})

app.get('/leaderboard', (request, response) => {
    database.find({}, (err, data) => {
        if (err) {
            response.end()
            return
        }
        response.json(data)
    })
})

function checkRightAnswers(rightIndexes, userIndexes) {
    let rightAnswers = 0
    for (let i = 0; i < rightIndexes.length; i++)
        if (rightIndexes[i] == userIndexes[i])
            rightAnswers++
    return rightAnswers
}