const {
  buildQuestionToSpeak
} = require("./lib/util");

module.exports.function = function updateQuiz(quiz, answer) {
  const i = quiz.index;
  const correctAnswers = quiz.questions[i].correctAnswer.acceptedAnswers;
  const currentQuestion = quiz.questions[quiz.index];

  currentQuestion.options.forEach(o => {
    if (answer.toLowerCase() == o.alias.toLowerCase()) {
      answer = o.text;
    }
  });

  quiz.questions[i].answer = answer;
  var correct = false;
  correctAnswers.forEach(o => {
    if (o.toLowerCase() == answer.toLowerCase()) {
      correct = true;
    }
  });

  if (correct) {
    quiz.questions[quiz.index].correct = true;
    quiz.score++;
  }

  if (quiz.index < quiz.questions.length - 1) {
    // console.log('sindei this if')
    quiz.textToSpeak = buildQuestionToSpeak(quiz.questions[i + 1]);
    quiz.index++;
  } else {
    var suggestion = "";
    var suggestionImage = "";
    if (quiz.title == 'Parking') {
      if (quiz.questions[0].answer == 'motorcycle') {
        if (quiz.questions[1].answer == 'Yes') {
          suggestion += "We recommend a 5x10 storage unit with drive up access (50sqft)."
          suggestionImage = "images/sm-size-guide.png"
        } else {
          suggestion += "We recommend a car parking space 8x18"
          suggestionImage = "images/sm-size-guide.png"
        }
      }

      if (quiz.questions[0].answer == 'car') {
        if (quiz.questions[1].answer == 'Yes') {
          suggestion += "We recommend a 10x20 storage unit with drive up access (200sqft)."
          suggestionImage = "images/sm-size-guide.png"
        } else {
          suggestion += "We recommend a car parking space 8x18"
          suggestionImage = "images/sm-size-guide.png"
        }
      }

      if (quiz.questions[0].answer == 'rv' || quiz.questions[0].answer === 'boat') {
        if (quiz.questions[1].answer == 'Yes') {
          suggestion += "Limited Availablility - Call to reserve"
          suggestionImage = "images/sm-size-guide.png"
        } else {
          suggestion += "We recommend a car parking space 16x36 - lmited availablity - call to reserve"
          suggestionImage = "images/sm-size-guide.png"
        }
      }
    }
    
    if (quiz.title == 'Household') {
      // console.log('inside household')
      // console.log(quiz.questions)
      if (quiz.questions[1].answer == 'closet') {
        suggestion += "I think a 5x5 unit would fit your needs."
        suggestionImage = "images/sm-size-guide.png"
      } else if (quiz.questions[1].answer == '1 room') {
        suggestion += "I think a 5x10 unit would fit your needs. Ready to book your unit? Our storage experts can help."
        suggestionImage = "images/sm-size-guide.png"
      } else if (quiz.questions[1].answer == '2 rooms') {
        suggestion += "I think a 5x15 unit would fit your needs. Ready to book your unit? Our storage experts can help."
        suggestionImage = "images/sm-size-guide.png"
      } else if (quiz.questions[1].answer == '3 rooms') {
        suggestion += "I think a 10x10 unit would fit your needs. Ready to book your unit? Our storage experts can help."
        suggestionImage = "images/med-size-guide.png"
      } else if (quiz.questions[1].answer == '4 rooms') {
        suggestion += "I think a 10x15 unit would fit your needs. Ready to book your unit? Our storage experts can help."
        suggestionImage = "images/large-size-guide.png"
      } else if (quiz.questions[1].answer == '5 rooms') {
        suggestion += "I think a 10x20 unit would fit your needs. Ready to book your unit? Our storage experts can help."
        suggestionImage = "images/large-size-guide.png"
      }else if (quiz.questions[1].answer == '6+ rooms') {
        suggestion += "I think a 10x20 unit would fit your needs. Ready to book your unit? Our storage experts can help."
        suggestionImage = "images/extra-large-size-guide.png"
      }
     
    }
   
    quiz.suggestion = suggestion;
    quiz.suggestionImage = suggestionImage;
    quiz.completed = true;
  }

  return quiz;
}
