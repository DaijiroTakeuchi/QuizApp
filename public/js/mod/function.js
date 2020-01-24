const title = document.getElementById("title");
const type = document.getElementById("type");
const supplement = document.getElementById("supplement");
const answers = document.getElementById("answers");

// クイズ取得
const getQuestions = async () => {
  title.innerText = "取得中";
  type.innerText = "";
  supplement.innerText = "少々お待ちください";
  answers.innerText = "";
  const data = await fetch("https://opentdb.com/api.php?amount=10");
  const obj = await data.json();

  // quizを更新
  quiz = new Quiz(obj.results);

  quiz.displayQuiz();
};

// 設問番号と、クイズ番号
const displayQuestion = (num, question) => {
  // [問題] 追加
  title.innerText = "問題" + num;

  // [ジャンル] 追加
  const quizCategory = question.category;
  const addCategory = document.createElement("p");
  addCategory.innerText = "[ジャンル] " + quizCategory;
  type.innerText = "";
  type.appendChild(addCategory);

  // [難易度] 追加
  const quizDifficulty = question.difficulty;
  const addDifficulty = document.createElement("p");
  addDifficulty.innerText = "[難易度] " + quizDifficulty;
  type.appendChild(addDifficulty);

  // 設問文追加
  const quizQuestion = question.question;
  supplement.innerText = quizQuestion;

  // 回答ボタン追加
  const choices = [];

  const correct = question.correct_answer;
  const incorrect = question.incorrect_answers;

  // 不正解をchoicesにpush
  for (let i = 0; i < incorrect.length; i++) {
    const addInputIncorrect = document.createElement("input");
    addInputIncorrect.setAttribute("class", "incorrect");
    addInputIncorrect.setAttribute("type", "submit");
    addInputIncorrect.setAttribute("value", incorrect[i]);
    choices.push(addInputIncorrect);
  }

  // 正解をchoicesにpush
  const addInputCorrect = document.createElement("input");
  addInputCorrect.setAttribute("id", "correct");
  addInputCorrect.setAttribute("type", "submit");
  addInputCorrect.setAttribute("value", correct);
  choices.push(addInputCorrect);

  // choicesの配列をシャッフル
  for (let i = choices.length - 1; i >= 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [choices[i], choices[rand]] = [choices[rand], choices[i]];
  }

  // ボタン表示
  answers.innerText = "";
  for (let i = 0; i < choices.length; i++) {
    answers.appendChild(choices[i]);
  }

  quiz.answerQuiz();
};


// 引数：正解数
const displayQuizAnswer = (correct) => {
  title.innerText = "あなたの正答数は" + correct + "です！！";
  type.innerText = "";
  supplement.innerText = "再度チャレンジしたい場合は以下をクリック！！";
  answers.innerText = "";

  // ホームに戻るボタンを生成
  const addReturnButton = document.createElement("input");
  addReturnButton.setAttribute("id", "return");
  addReturnButton.setAttribute("type", "submit");
  addReturnButton.setAttribute("value", "ホームに戻る");
  answers.appendChild(addReturnButton);
  returnQuiz();
};

// 元に戻るボタンを押した時の挙動
const returnQuiz = () => {
  const addGetButtonId = document.getElementById("return");

  addGetButtonId.addEventListener("click", (e) => {
    e.preventDefault();
    title.innerText = "ようこそ";
    type.innerText = "";
    supplement.innerText = "以下のボタンをクリック";
    answers.innerText = "";

    // ホームに戻るボタンの生成
    const addGetButton = document.createElement("input");
    addGetButton.setAttribute("id", "re-question");
    addGetButton.setAttribute("type", "submit");
    addGetButton.setAttribute("value", "送信");
    answers.appendChild(addGetButton);

    const addGetButtonId = document.getElementById("re-question");

    addGetButtonId.addEventListener("click", (e) => {
      e.preventDefault();
      quiz.initializeQuiz();
      getQuestions();
    });
  });
};
