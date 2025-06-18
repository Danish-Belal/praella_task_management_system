const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {
    handleCreateTask,
     handleGetTasks,
    handleUpdateTask,
    handleDeleteTask

} = require('../controllers/taskController');

router.use(authMiddleware)
router.post('/:pId/createTask',  handleCreateTask);
router.get('/getAllTasks/:pId',  handleGetTasks);
router.put('/:pId/updateTask/:id',  handleUpdateTask);
router.delete('/:pId/deleteTask/:id',  handleDeleteTask);



module.exports = router;
