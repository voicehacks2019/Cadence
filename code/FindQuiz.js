var console = require("console");
const { buildQuizzes } = require("./lib/util.js");

exports.function = function(searchTerm) {
  console.log(searchTerm);
  const quizzes = buildQuizzes(searchTerm)
  console.log(quizzes)
  return quizzes;
};
