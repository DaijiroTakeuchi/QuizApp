class Quiz {
  constructor() {
    this._quiz = [];
    this._number = 0;
    this._correct = 0;
    this._incorrect = 0;
    this._title = document.getElementById('title');
    this._type = document.getElementById('type');
    this._supplement = document.getElementById('supplement');
    this._answers = document.getElementById('answers');
  }

  async getQuiz() {
    this._title.innerText = "取得中";
    this._type.innerText = "";
    this._supplement.innerText = "少々お待ちください";
    this._answers.innerText = "";
    const data = await fetch('https://opentdb.com/api.php?amount=10');
    const obj = await data.json();
    this._quiz = obj.results;
    this.displayQuiz(this._number);
  }

  // 引数num: 配列番号
  displayQuiz(num) {
    if (num < 10) {
      // 問題番号追加
      const quizNumber = num + 1;
      this._title.innerText = "問題" + quizNumber;

      // [ジャンル] 追加
      const quizCategory = this._quiz[num].category;
      const addCategory = document.createElement('p');
      addCategory.innerText = "[ジャンル] " + quizCategory;
      this._type.innerText = "";
      this._type.appendChild(addCategory);

      // [難易度] 追加
      const quizDifficulty = this._quiz[num].difficulty;
      const addDifficulty = document.createElement('p');
      addDifficulty.innerText = "[難易度] " + quizDifficulty;
      this._type.appendChild(addDifficulty);

      // 設問文追加
      const quizQuestion = this._quiz[num].question;
      this._supplement.innerText = quizQuestion;

      // 回答ボタン追加
      const choices = [];

      const correct = this._quiz[num].correct_answer;
      const incorrect = this._quiz[num].incorrect_answers;

      // 不正解をchoicesにpush
      for (let i = 0; i < incorrect.length; i++) {
        const addInputIncorrect = document.createElement('input');
        addInputIncorrect.setAttribute('class', "incorrect");
        addInputIncorrect.setAttribute('type', 'submit');
        addInputIncorrect.setAttribute('value', incorrect[i]);
        choices.push(addInputIncorrect);
      }

      // 正解をchoicesにpush
      const addInputCorrect = document.createElement('input');
      addInputCorrect.setAttribute('id', 'correct');
      addInputCorrect.setAttribute('type', 'submit');
      addInputCorrect.setAttribute('value', correct);
      choices.push(addInputCorrect);

      // choicesの配列をシャッフル
      for (let i = choices.length - 1; i >= 0; i--) {
        const rand = Math.floor(Math.random() * (i + 1));
        [choices[i], choices[rand]] = [choices[rand], choices[i]]
      }

      // ボタン表示
      this._answers.innerText = "";
      for (let i = 0; i < choices.length; i++) {
        this._answers.appendChild(choices[i]);
      }

      this.answerQuiz();

    } else {
      this._title.innerText = "あなたの正答数は" + this._correct + "です！！";
      this._type.innerText = "";
      this._supplement.innerText = "再度チャレンジしたい場合は以下をクリック！！";
      this._answers.innerText = "";

      // ホームに戻るボタンを生成
      const addReturnButton = document.createElement('input');
      addReturnButton.setAttribute('id', 'return');
      addReturnButton.setAttribute('type', 'submit');
      addReturnButton.setAttribute('value', 'ホームに戻る');
      this._answers.appendChild(addReturnButton);
      this.returnQuiz();
    }
  }

  answerQuiz() {
    // 正解ボタンを押したとき
    const getAnswersCorrect = document.getElementById('correct');
    getAnswersCorrect.addEventListener('click', () => {
      this._correct += 1;
      this._number += 1;
      this.displayQuiz(this._number);
    });

    // 不正解ボタンを押したとき
    const getAnswersIncorrect = document.getElementsByClassName('incorrect');
    for (let i = 0; i < getAnswersIncorrect.length; i++) {
      getAnswersIncorrect[i].addEventListener('click', () => {
        this._incorrect += 1;
        this._number += 1;
        this.displayQuiz(this._number);
      });
    }
  }

  // 元に戻るボタンを押した時の挙動
  returnQuiz() {
    const addGetButtonId = document.getElementById('return');

    addGetButtonId.addEventListener('click', () => {

      this._title.innerText = "ようこそ";
      this._type.innerText = "";
      this._supplement.innerText = "以下のボタンをクリック";
      this._answers.innerText = "";

      // ホームに戻るボタンの生成
      const addGetButton = document.createElement('input');
      addGetButton.setAttribute('id', 're-question');
      addGetButton.setAttribute('type', 'submit');
      addGetButton.setAttribute('value', '送信');
      this._answers.appendChild(addGetButton);

      const addGetButtonId = document.getElementById('re-question');

      addGetButtonId.addEventListener('click', () => {
        // 初期化
        this._quiz = [];
        this._number = 0;
        this._correct = 0;
        this._incorrect = 0;

        this.getQuiz();
      });
    });
  }
}
