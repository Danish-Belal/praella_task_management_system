const express = require('express');
const router = express.Router();

const {
  handleCreateProject,
  handleGetProjects,
  handleUpdateProject,
  handleDeleteProject,
  getProjectByIdReq
} = require('../controllers/projectController');

const authenticateUser = require('../middleware/auth');

// Protect all routes
router.use(authenticateUser);

router.post('/createProject', handleCreateProject);
router.get('/getAllProject', handleGetProjects);
router.put('/updateProject/:id', handleUpdateProject);
router.delete('/deleteProject/:id', handleDeleteProject);
router.get('/getProjectbyId/:id', getProjectByIdReq)

module.exports = router;
