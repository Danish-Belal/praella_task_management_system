const express = require('express');
const {
  handleCreateComment,
  handleGetComments,
  handleDeleteComment
} = require('../controllers/commentController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/uploadMiddleware')

const router = express.Router();

router.use(authMiddleware);


router.post('/:pId/:tId/createComment', upload.single('attachment'), handleCreateComment);
router.get('/:pId/:tId/getAllComments', handleGetComments);
router.delete('/:pId/:tId/deleteComment/:cId', handleDeleteComment);

module.exports = router;
