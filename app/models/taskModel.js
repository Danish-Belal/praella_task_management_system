const {connectionPool} = require('../../config/db')


// create a task for a project.
const createTask = async (title, description, deadline, projectId, priority='medium') => {
  const result = await connectionPool.query(
    `INSERT INTO tasks (title, description,  deadline, project_id,priority)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [title, description,  deadline, projectId, priority]
  );
  return result.rows[0];
};

module.exports ={
    createTask
}