async function getAllSubjects(connection) {
  let subjectPromise = new Promise((resolve, reject) => {
    connection.query("SELECT * FROM subject", (error, results, fields) => {
      if (error) throw error;
      let subjects = [];
      subjects = subjects.concat(results);
      resolve(subjects);
    });
  });

  return subjectPromise;
}

module.exports = { getAllSubjects };
