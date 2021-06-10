getLeaderboard()

async function getLeaderboard() {
    const response = await fetch('/leaderboard')
    const data = await response.json()

    updateTable(data)
}

function updateTable(data) {

    data = bubbleSortJson(data)

    for (let item of data) {
        const row = document.createElement('tr')

        const name = document.createElement('td')
        const score = document.createElement('td')

        name.textContent = item.name
        score.textContent = item.rightAnswers

        row.append(name, score)
        document.getElementsByTagName('tbody')[0].append(row)
    }
}

function bubbleSortJson(json) {
    const len = json.length
    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len - 1; j++) {
            if (json[j].rightAnswers < json[j + 1].rightAnswers) {
                const temp = json[j]
                json[j] = json[j + 1]
                json[j + 1] = temp
            }
        }
    }
    return json
}