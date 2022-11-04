async function getSubjectId(connection, name) {
  let subjectId = new Promise(async (resolve, reject) => {
    connection.query(
      "SELECT subject_id FROM subject WHERE name = ?;",
      [name],
      async (error, results, fields) => {
        if (error) throw error;
        resolve(results);
      }
    );
  });
  return subjectId;
}

module.exports = { getSubjectId };
