// const api = new API;
const quiz = new Quiz;

const getQuestion = document.getElementById('get-questions');

getQuestion.addEventListener('click', () => {
  quiz.getQuiz();
});
