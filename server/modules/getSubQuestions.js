async function getSubQuestions(connection) {
    let subQuestion = new Promise((resolve, reject) => {
      connection.query(
        "SELECT * from sub_questions", (error, results, fields) => {
          if (error) reject(error);
          resolve(results);
        });
    });
    return subQuestion;
  }
  
  module.exports = { getSubQuestions };
  