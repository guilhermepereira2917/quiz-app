const questions = [{
    title: 'Atualmente, quantos elementos químicos a tabela periódica possui?',
    alternatives: ['113', '109', '108', '118', '92']
}, {
    title: 'Quanto tempo a luz do Sol demora para chegar à Terra?',
    alternatives: ['12 minutos', '1 dia', '12 horas', '8 minutos', 'segundos']
}, {
    title: 'Quais são os três predadores do reino animal reconhecidos pela habilidade de caçar em grupo, se camuflar para surpreender as presas e possuir sentidos apurados, respectivamente',
    alternatives: ['Tubarão branco, crocodilo e sucuri', 'Tigre, gavião e orca', 'Hiena, urso branco e lobo cinzento', 'Orca, onça e tarântula', 'Leão, tubarão branco e urso cinzento']
}, {
    title: 'Qual a velocidade da luz?',
    alternatives: ['300 000 000 metros por segundo (m/s)', '150 000 000 metros por segundo (m/s)', '199 792 458 metros por segundo (m/s)', '299 792 458 metros por segundo (m/s)', '30 000 000 metros por segundo (m/s)']
}, {
    title: 'Qual a montanha mais alta do Brasil?',
    alternatives: ['Pico da Neblina', 'Pico Paraná', 'Monte Roraima', 'Pico Maior de Friburgo', 'Pico da Bandeira']
}]

renderQuiz();

function renderQuiz() {
    questionIndex = 0
    for (let question of questions) {
        const questionContainer = document.createElement('div')
        questionContainer.className = 'question-container'

        const questionTitle = document.createElement('h2')
        questionTitle.className = 'question-title'
        questionTitle.innerText = question.title
        questionContainer.append(questionTitle)

        const alternatives = document.createElement('ul')
        alternatives.className = 'alternatives'
        questionContainer.append(alternatives)

        options = ['a', 'b', 'c', 'd', 'e']
        let counter = 0

        for (let alternative of question.alternatives) {
            const li = document.createElement('li')
            const alternativeLetter = options[counter++]

            const input = document.createElement('input')
            input.type = 'radio'
            input.id = alternativeLetter
            input.name = 'answer' + questionIndex

            const label = document.createElement('label')
            label.htmlFor = 'answer' + questionIndex
            label.innerText = alternative

            li.append(input, label)
            alternatives.append(li)
        }

        questionIndex++
        document.body.append(questionContainer)
    }
}

let name,
    answersIndex

function checkNameAndAnswers() {

    name = document.getElementById('name').value

    if (name == "") {
        alert('Digite seu nome')
        return
    }

    answersIndex = []

    for (let i = 0; i < questions.length; i++) {
        const alternatives = document.getElementsByName('answer' + i)

        for (let a = 0; a < alternatives.length; a++)
            if (alternatives[a].checked)
                answersIndex.push(a)
    }

    if (answersIndex.length < questions.length) {
        alert('Assinale todas as questões')
        return
    } else {
        submitNameAndScore()
    }
}

async function submitNameAndScore() {
    const data = {
        name,
        answersIndex
    }

    const options = {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }

    const response = await fetch('/leaderboard', options)
    const json = await response.json()
    console.log(json)
    alert(`Você acertou ${json.rightAnswers}/${json.answersIndex.length} questões`)

}