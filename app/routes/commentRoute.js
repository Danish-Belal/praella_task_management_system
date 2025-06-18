const express = require('express');
const {
  handleCreateComment,
  handleGetComments,
  handleDeleteComment
} = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

// Format: /api/comments/:pId/:tId/createComment
router.post('/:pId/:tId/createComment', handleCreateComment);
router.get('/:pId/:tId/getAllComments', handleGetComments);
router.delete('/:pId/:tId/deleteComment/:cId', handleDeleteComment);

module.exports = router;
