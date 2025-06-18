const { connectionPool } = require('../../config/db');

// Create Project
const createProject = async (name, description, ownerId) => {
  try {
    const result = await connectionPool.query(
      `INSERT INTO projects (name, description, owner_id) VALUES ($1, $2, $3) RETURNING *`,
      [name, description, ownerId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error creating project:', error.message);
    throw new Error('Database error while creating project');
  }
};

// Get all projects of a user
const getUserProjects = async (ownerId) => {
  try {
    const result = await connectionPool.query(
      `SELECT * FROM projects WHERE owner_id = $1 ORDER BY created_at DESC`,
      [ownerId]
    );
    return result.rows;
  } catch (error) {
    console.error('Error fetching user projects:', error.message);
    throw new Error('Database error while fetching projects');
  }
};

// Update a project
const updateProject = async (projectId, updates, ownerId) => {
    const fields = [];
    const values = [];
    let index = 1;

    if (updates.name) {
        fields.push(`name = $${index++}`);
        values.push(updates.name);
    }

    if (updates.description) {
        fields.push(`description = $${index++}`);
        values.push(updates.description);
    }

    if (fields.length === 0) return null;

    values.push(projectId);     // $n for id
    values.push(ownerId);       // $n+1 for owner

  const query = `
    UPDATE projects 
    SET ${fields.join(', ')}, updated_at = NOW()
    WHERE id = $${index++} AND owner_id = $${index}
    RETURNING *`;

  
  try {
    const result = await connectionPool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error updating project:', error.message);
    throw new Error('Database error while updating project');
  }
};

// Delete a project
const deleteProject = async (projectId, ownerId) => {
  try {
    const result = await connectionPool.query(
      `DELETE FROM projects WHERE id = $1 AND owner_id = $2 RETURNING *`,
      [projectId, ownerId]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Error deleting project:', error.message);
    throw new Error('Database error while deleting project');
  }
};

const getProjectById = async (projectId) => {
  const result = await connectionPool.query(`SELECT * FROM projects WHERE id = $1`, [projectId]);
  return result.rows[0];
};

module.exports = {
  createProject,
  getUserProjects,
  updateProject,
  deleteProject,
  getProjectById
};
