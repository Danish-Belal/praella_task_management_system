const {createTask,getTasksByProject,updateTask,deleteTask} = require('../models/taskModel')
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

// get all tasks for a project
const handleGetTasks = async (req, res) => {
  
    const  projectId  = req.params.pId;
    const  ownerId = req.user.id;

    try {
            await verifyProjectOwnership(projectId, ownerId);
    }catch (err) {
        return res.status(403).json({ success: false, message: err.message });
    }

    try {
    const tasks = await getTasksByProject(projectId);
    return res.status(200).json({ success: true, tasks });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Update Task
const handleUpdateTask = async (req, res) => {
  const { id: taskId } = req.params;
  const project_id = req.params.pId
  const updates = req.body;
  const ownerId = req.user.id;

  

  try {
    await verifyProjectOwnership(project_id, ownerId);
  } catch (err) {
    return res.status(403).json({ success: false, message: err.message });
  }

  try {
    const updatedTask = await updateTask(taskId, updates);
    if (!updatedTask) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    return res.status(200).json({ success: true, task: updatedTask });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Task
const handleDeleteTask = async (req, res) => {
  const { id: taskId } = req.params;
   const project_id = req.params.pId
  const ownerId = req.user.id;

  if (!project_id) {
    return res.status(400).json({ success: false, message: 'project_id is required' });
  }

  try {
    await verifyProjectOwnership(project_id, ownerId);
  } catch (err) {
    return res.status(403).json({ success: false, message: err.message });
  }

  try {
    const deleted = await deleteTask(taskId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Task not found or already deleted' });
    }

    return res.status(200).json({ success: true, task: deleted });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  handleCreateTask,
  handleGetTasks,
  handleUpdateTask,
  handleDeleteTask
};