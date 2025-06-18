const {createTask} = require('../models/taskModel')
const {verifyProjectOwnership} = require('../utils/ownership')

// Create Task
const handleCreateTask = async (req, res) => {
  
    const { title, description,  priority, deadline} = req.body;

    if (!title || !deadline) {
      return res.status(400).json({ success: false, message: 'Title and deadline is required' });
    }
    const projectId = req.params.pId;
    const ownerId = req.user.id;
    // console.log(ownerId);
    
    try {
            await verifyProjectOwnership(projectId, ownerId);
        }catch (err) {
            return res.status(403).json({ success: false, message: err.message });
        }
    
    try {
    const task = await createTask(title, description, deadline, projectId,priority,);
    return res.status(201).json({ success: true, task });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports={
    handleCreateTask
}