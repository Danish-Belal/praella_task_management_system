const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth');
const {handleCreateTask} = require('../controllers/taskController');

router.use(authMiddleware)
router.post('/:pId/createTask',  handleCreateTask);



module.exports = router;
