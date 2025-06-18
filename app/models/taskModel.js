const {connectionPool} = require('../../config/db')


// create a task for a project.
const createTask = async (title, description,  priority, deadline, projectId) => {
  const result = await connectionPool.query(
    `INSERT INTO tasks (title, description,  priority, deadline, project_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [title, description,  priority, deadline, projectId]
  );
  return result.rows[0];
};

module.exports ={
    createTask
}