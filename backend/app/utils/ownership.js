const { getProjectById } = require('../models/projectModel');
const verifyProjectOwnership = async (projectId, userId) => {
  const project = await getProjectById(projectId);
  if (!project) {
    throw new Error('Project not found');
  }
  if (project.owner_id !== userId) {
    throw new Error('Access denied: not your project');
  }
  return project;
};

module.exports = {
  verifyProjectOwnership,
};