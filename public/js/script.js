let quiz = new Quiz();
const getQuestion = document.getElementById('get-questions');

getQuestion.addEventListener('click', (e) => {
  e.preventDefault();
  getQuestions();
});
