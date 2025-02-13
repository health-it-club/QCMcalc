function generateAnswerInputs() {
    const numQuestions = parseInt(document.getElementById('numQuestions').value);
    const answerInputs = document.getElementById('answerInputs');
    const ctTitleDiv = document.getElementById('ctTitle')
    const userTitleDiv = document.getElementById('userTitle')
    answerInputs.innerHTML = '';
    ctTitleDiv.innerHTML = `
        <h4>Veuillez entrer les réponses correctes pour chaque question: </h4>
    `;
    answerInputs.appendChild(ctTitleDiv)
    for (let i = 1; i <= numQuestions; i++) {
        const ctDiv = document.createElement('div');
        ctDiv.className = 'answer-group';
        ctDiv.innerHTML = `
            <p><b>Question ${i}</b> <em>(Sélectionnez la bonne réponse)</em></p>
            ${generateCheckboxes(i, 'Correct')}
        `;
        answerInputs.appendChild(ctDiv);
    }
    userTitleDiv.innerHTML = `
        <h4>Entrez vos réponses pour chaque question: <h3>
    `;
    answerInputs.append(userTitleDiv)
    for (let j = 1; j <= numQuestions; j++) {
        const userAnswerDiv = document.createElement('div');
        userAnswerDiv.className = 'answer-group';
        userAnswerDiv.innerHTML = `
            <p><b>Question ${j}</b> <em>(Sélectionnez votre réponse)</em></p>
            ${generateCheckboxes(j, 'User')}
        `;
        answerInputs.appendChild(userAnswerDiv);
    }
    const calculateButton = document.createElement('button');
    calculateButton.textContent = 'Calculer ma note';
    calculateButton.onclick = calculateGrade;
    answerInputs.appendChild(calculateButton);
}

function generateCheckboxes(questionNumber, type) {
    return ['A', 'B', 'C', 'D', 'E'].map(letter => `
        <input type="checkbox" id="${letter}${type}${questionNumber}" class='checkboxInput'>
        <label for="${letter}${type}${questionNumber}" class='checkboxLabel'>${letter}</label>
    `).join('');
}

function getAnswers(questionNumber, type) {
    return ['A', 'B', 'C', 'D', 'E'].filter(letter => 
        document.getElementById(`${letter}${type}${questionNumber}`).checked
    );
}

function calculateGrade() {
    const numQuestions = parseInt(document.getElementById('numQuestions').value);
    const testType = document.getElementById('testType').value;
    let totalScore = 0;

    for (let i = 1; i <= numQuestions; i++) {
        const correctAnswers = getAnswers(i, 'Correct');
        const userAnswers = getAnswers(i, 'User');
        let questionScore = 0;
        const numCorrectAnswers = correctAnswers.length;

        switch(testType) {
            case 'QCSs':
            case 'allOrNothing':
                if (arraysEqual(correctAnswers, userAnswers)) {
                    questionScore = 1;
                } else {
                    questionScore = 0;
                }
                break;
            case 'partiallyPositive':
                for (const answer of userAnswers) {
                    if (correctAnswers.includes(answer)) {
                        questionScore += 1 / numCorrectAnswers;
                    } else {
                        questionScore -= 1 / numCorrectAnswers;
                    }
                }
                break;
            case 'partiallyNegative':
                for (const answer of userAnswers) {
                    if (correctAnswers.includes(answer)) {
                        questionScore += 1 / numCorrectAnswers;
                    } else {
                        questionScore = 0;
                        break;
                    }
                }
                break;
        }

        totalScore += Math.max(questionScore, 0);
    }
    const gradePerQuestion = 20/numQuestions;
    const grade = totalScore * gradePerQuestion;
    document.getElementById('result').innerHTML = `
        <h4>Résultats</h4>
        <h5>Nombre de réponses correctes: ${totalScore.toFixed(2)} sur ${numQuestions}</h5>
        <h5>Votre note finale: ${grade.toFixed(2)}/20</h5>
    `;
}

function arraysEqual(a, b) {
    if (a.length !== b.length) return false;
    return a.every((val) => b.includes(val));
}