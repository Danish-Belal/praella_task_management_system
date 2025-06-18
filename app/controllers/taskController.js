const {createTask} = require('../models/taskModel')
const{getProjectById} = require('../models/projectModel')

// Create Task
const handleCreateTask = async (req, res) => {
  try {
    const { title, description,  priority, deadline} = req.body;

    if (!title || !deadline) {
      return res.status(400).json({ success: false, message: 'Title and deadline is required' });
    }
    const projectId = req.params.pId;
    const ownerId = req.user.id;
    // console.log(ownerId);
    

    // Verify ownership for the project.
    const project = await getProjectById(projectId);
    // console.log("Project owner id", project );
    
    if (!project || project.owner_id !== ownerId) {
      return res.status(403).json({ success: false, message: 'Access denied: This is not your project or prjoect not found' });
    }
    

    const task = await createTask(title, description,  priority, deadline, projectId);
    return res.status(201).json({ success: true, task });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports={
    handleCreateTask
}