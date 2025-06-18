const {
  createProject,
  getUserProjects,
  updateProject,
  deleteProject,
  getProjectById
} = require('../models/projectModel');

// Create Project
const handleCreateProject = async (req, res) => {
  const { name, description } = req.body;

  if (!name || !description) {
        return res.status(400).json({
        success: false,
        message: 'Project name and description are required.',
        });
    }

  const ownerId = req.user.id; // attacing via middleware.

  try {
    const project = await createProject(name, description, ownerId);
    return res.status(201).json({ success: true, ProjectData: project });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get all Projects
const handleGetProjects = async (req, res) => {
  const ownerId = req.user.id;

  try {
    const projects = await getUserProjects(ownerId);
    return res.status(200).json({ success: true, ProjectData: projects });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update Project
const handleUpdateProject = async (req, res) => {
  const { name, description } = req.body;
  const projectId = req.params.id;
  const ownerId = req.user.id;

  const updates = {};
  if (name) updates.name = name;
  if (description) updates.description = description;

  if (Object.keys(updates).length === 0) {
    return res.status(400).json({
      success: false,
      message: 'At least one field (name or description) must be provided to update',
    });
  }

  try {
    
    //  get that project
    const existingProject = await getProjectById(projectId);
    if (!existingProject) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // check if same user is trying to update
    if (existingProject.owner_id !== ownerId) {
      return res.status(403).json({ success: false, message: 'You do not have access to update this project' });
    }

    const updated = await updateProject(projectId, updates, ownerId);
    if (!updated) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    return res.status(200).json({ success: true, message: "Project Updated succesfully",ProjectData: updated });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Project
const  handleDeleteProject = async (req, res) => {
  const projectId = req.params.id;
  const ownerId = req.user.id;

  const existingProject = await getProjectById(projectId);
    if (!existingProject) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }

    // check if same user is trying to update
    if (existingProject.owner_id !== ownerId) {
      return res.status(403).json({ success: false, message: 'You do not have access to update this project' });
    }

  try {
    const deleted = await deleteProject(projectId, ownerId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    return res.status(200).json({ success: true, message: 'Project deleted successfully' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

const getProjectByIdReq = async(req,res)=>{
  projectId = req.params.id;
  try{
    const projectData = await getProjectById(projectId);
    if(!projectData){
      return res.status(404).json({ success: false, message: 'Project not found' });
    }
    return res.status(200).json({ success: true, message: "Project data",ProjectData: projectData });

  }catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }

}

module.exports = {
  handleCreateProject,
  handleGetProjects,
  handleUpdateProject,
  handleDeleteProject,
  getProjectByIdReq
};
