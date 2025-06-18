const { connectionPool } = require('../../config/db');

// Create Comment
const createComment = async (content, attachment, userId, taskId, parentId = null) => {
  const result = await connectionPool.query(
    `INSERT INTO comments (content, attachment, user_id, task_id, parent_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [content, attachment, userId, taskId, parentId]
  );
  return result.rows[0];
};

// Get All Comments for a Task
const getCommentsByTask = async (taskId) => {
  const result = await connectionPool.query(
    `SELECT * FROM comments WHERE task_id = $1 ORDER BY created_at ASC`,
    [taskId]
  );
  return result.rows;
};

// Delete Comment
const deleteComment = async (commentId, userId) => {
  const result = await connectionPool.query(
    `DELETE FROM comments WHERE id = $1 AND user_id = $2 RETURNING *`,
    [commentId, userId]
  );
  return result.rows[0];
};

module.exports = {
  createComment,
  getCommentsByTask,
  deleteComment
};
