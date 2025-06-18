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

// Get all tasks of a project
const getTasksByProject = async (projectId) => {
  const result = await connectionPool.query(
    `SELECT * FROM tasks WHERE project_id = $1 ORDER BY created_at DESC`,
    [projectId]
  );
  return result.rows;
};

// Update task
const updateTask = async (taskId, updates) => {
  const fields = [];
  const values = [];
  let index = 1;

  for (const key in updates) {
    fields.push(`${key} = $${index}`);
    values.push(updates[key]);
    index++;
  }

  const query = `
    UPDATE tasks SET ${fields.join(', ')}, updated_at = NOW()
    WHERE id = $${index} RETURNING *`;
  values.push(taskId);

  const result = await connectionPool.query(query, values);
  return result.rows[0];
};

// Delete task
const deleteTask = async (taskId) => {
  const result = await connectionPool.query(
    `DELETE FROM tasks WHERE id = $1 RETURNING *`,
    [taskId]
  );
  return result.rows[0];
};

module.exports = {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask
};
