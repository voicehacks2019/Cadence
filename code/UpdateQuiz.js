const { buildQuestionToSpeak } = require("./lib/util");

module.exports.function = function updateQuiz (quiz, answer) {
  const i = quiz.index;
  const correctAnswers = quiz.questions[i].correctAnswer.acceptedAnswers;
  const currentQuestion = quiz.questions[quiz.index];

  currentQuestion.options.forEach(o=>{
    if(answer.toLowerCase() == o.alias.toLowerCase()){
      answer = o.text;
    }
  });

  quiz.questions[i].answer = answer;
  var correct = false;
  correctAnswers.forEach(o=>{
    if(o.toLowerCase() == answer.toLowerCase()){
      correct = true;
    }
  });

  if(correct){
    quiz.questions[quiz.index].correct = true;
    quiz.score++;
  }

  if(quiz.index < quiz.questions.length - 1){
    console.log('sindei this if')
    quiz.textToSpeak = buildQuestionToSpeak(quiz.questions[i+1]);
    quiz.index++;
  } else {
    console.log('inside this else')
    var suggestion = "";
    if(quiz.title == 'Household'){
      console.log('inside household')
      console.log(quiz.questions)
      if(quiz.questions[0].answer == '1'){
        suggestion += "We recommend 1 storage unit"
      } else {
        suggestion += "We recommend 10 storage units"
      }
      if(quiz.questions[1].answer == 'Yes'){
        suggestion += " with climate control."
      } else {
        suggestion += " without climate control."
      }
    } else {
      return null;
    }
    quiz.suggestion = suggestion;
    quiz.completed = true;
  }

  return quiz;
}
