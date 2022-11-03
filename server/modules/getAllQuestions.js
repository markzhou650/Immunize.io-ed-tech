async function getAllQuestions(connection, subjects) {
  let questionPromise = new Promise(async (resolve, reject) => {
    let questions = {};
    for (let subject of subjects) {
      questions[subject.name] = await getQuestion(
        connection,
        subject.subject_id
      );
    }
    resolve(questions);
  });
  return questionPromise;
}

async function getQuestion(connection, subject_id) {
  let questionPromise = new Promise((resolve, reject) => {
    connection.query(
      `SELECT * FROM questions WHERE frn_subject_id = ${subject_id}`,
      (error, results, fields) => {
        if (error) throw error;
        resolve(results);
      }
    );
  });
  return questionPromise;
}

module.exports = { getAllQuestions, getQuestion };
