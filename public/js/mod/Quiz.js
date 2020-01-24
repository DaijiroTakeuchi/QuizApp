class Quiz {
  // 引数: getQuestionsで得たQuizの配列
  constructor(quiz) {
    this._quiz = quiz;
    this._number = 0;
    this._correct = 0;
    this._incorrect = 0;
  }

  // 引数num: 配列番号
  displayQuiz() {
    if (this._number < 10) {
      // 問題番号追加
      const quizNumber = this._number + 1;

      // displayQuestionに設問番号とクイズ番号を追加
      displayQuestion(quizNumber, this._quiz[this._number]);

    } else {
      displayQuizAnswer(this._correct);
    }
  }

  answerQuiz() {
    // 正解ボタンを押したとき
    const getAnswersCorrect = document.getElementById('correct');
    getAnswersCorrect.addEventListener('click', (e) => {
      e.preventDefault();
      this._correct += 1;
      this._number += 1;
      this.displayQuiz();
    });

    // 不正解ボタンを押したとき
    const getAnswersIncorrect = document.getElementsByClassName('incorrect');
    for (let i = 0; i < getAnswersIncorrect.length; i++) {
      getAnswersIncorrect[i].addEventListener('click', (e) => {
        e.preventDefault();
        this._incorrect += 1;
        this._number += 1;
        this.displayQuiz();
      });
    }
  }

  // 初期化
  initializeQuiz() {
    this._quiz = [];
    this._number = 0;
    this._correct = 0;
    this._incorrect = 0;
  }

}
