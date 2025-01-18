// Get the start button element from the DOM
const startButton = document.getElementById('start-btn')

// Get the next button element from the DOM
const nextButton = document.getElementById('next-btn')

// Get the question container element from the DOM
const questionContainerElement = document.getElementById('question-container')

// Get the question element from the DOM
const questionElement = document.getElementById('question')

// Get the answer buttons container element from the DOM
const answerButtonsElement = document.getElementById('answer-buttons')

// Variables to hold shuffled questions and the current question index
let shuffledQuestions, currentQuestionIndex

// Add a click event listener to the start button to start the game
startButton.addEventListener('click', startGame)

// Add a click event listener to the next button to move to the next question
nextButton.addEventListener('click', () => {
  currentQuestionIndex++ // Increment the current question index
  setNextQuestion() // Display the next question
})

// Function to start the game
function startGame() {
  startButton.classList.add('hide') // Hide the start button
  shuffledQuestions = questions.sort(() => Math.random() - .5) // Shuffle the questions randomly
  currentQuestionIndex = 0 // Reset the question index to 0
  questionContainerElement.classList.remove('hide') // Show the question container
  setNextQuestion() // Set and display the first question
}

// Function to set and display the next question
function setNextQuestion() {
  resetState() // Reset the UI state for the new question
  showQuestion(shuffledQuestions[currentQuestionIndex]) // Display the current question
}

// Function to display a question and its answers
function showQuestion(question) {
  questionElement.innerText = question.question // Set the question text
  question.answers.forEach(answer => { // Loop through each answer option
    const button = document.createElement('button') // Create a new button for each answer
    button.innerText = answer.text // Set the button text to the answer text
    button.classList.add('btn') // Add a CSS class for styling the button
    if (answer.correct) { // If the answer is correct
      button.dataset.correct = answer.correct // Add a `data-correct` attribute to the button
    }
    button.addEventListener('click', selectAnswer) // Add a click event listener to the button
    answerButtonsElement.appendChild(button) // Add the button to the answer buttons container
  })
}

// Function to reset the UI state for a new question
function resetState() {
  clearStatusClass(document.body) // Clear the status class (correct/wrong) from the body
  nextButton.classList.add('hide') // Hide the next button
  while (answerButtonsElement.firstChild) { // Remove all existing answer buttons
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

// Function to handle answer selection
function selectAnswer(e) {
  const selectedButton = e.target // Get the button that was clicked
  const correct = selectedButton.dataset.correct // Check if the selected answer is correct
  setStatusClass(document.body, correct) // Update the body class based on the correctness of the answer
  Array.from(answerButtonsElement.children).forEach(button => { // Loop through all answer buttons
    setStatusClass(button, button.dataset.correct) // Update the button class based on correctness
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) { // If there are more questions
    nextButton.classList.remove('hide') // Show the next button
  } else { // If this was the last question
    startButton.innerText = 'Restart' // Change the start button text to "Restart"
    startButton.classList.remove('hide') // Show the start button
  }
}

// Function to set the status class (correct/wrong) on an element
function setStatusClass(element, correct) {
  clearStatusClass(element) // Clear any existing status class
  if (correct) { // If the answer is correct
    element.classList.add('correct') // Add the "correct" class
  } else { // If the answer is incorrect
    element.classList.add('wrong') // Add the "wrong" class
  }
}

// Function to clear the status class from an element
function clearStatusClass(element) {
  element.classList.remove('correct') // Remove the "correct" class
  element.classList.remove('wrong') // Remove the "wrong" class
}

// Array of questions and answers
const questions = [
  {
    question: 'What is 2 + 2?', // Question text
    answers: [ // Array of answer options
      { text: '4', correct: true }, // Correct answer
      { text: '22', correct: false } // Incorrect answer
    ]
  },
  {
    question: 'What is 5 + "5"', // Question text
    answers: [ // Array of answer options
      { text: '55', correct: true }, // Correct answer
      { text: '25', correct: false }, // Incorrect answer
      { text: '44', correct: false }, // Incorrect answer
      { text: '15', correct: false } // Incorrect answer
    ]
  },
  {
    question: 'Is Ihifix good?', // Question text
    answers: [ // Array of answer options
      { text: 'Yes', correct: true }, // Correct answer
      { text: 'No', correct: false } // Incorrect answer
    ]
  },
  {
    question: 'Who is the best tutor in Ihifix?', // Question text
    answers: [ // Array of answer options (multiple correct answers)
      { text: 'Mr Issac', correct: true },
      { text: 'Mr Salim', correct: true },
      { text: 'Mr Jibril', correct: true },
      { text: 'Mr Paul', correct: true }
    ]
  }
]
