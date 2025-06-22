const { createComment, getCommentsByTask, deleteComment } = require('../models/commentModel');
const { verifyProjectOwnership } = require('../utils/ownership'); // reuse this
const  {uploadToS3,getSignedS3Url}  = require('../utils/uploader');

// Create Comment
const handleCreateComment = async (req, res) => {
  const { content, parent_id } = req.body;
  const taskId = req.params.tId;
  const projectId = req.params.pId;
  const userId = req.user.id;

  if (!content) {
    return res.status(400).json({ success: false, message: 'Content is required' });
  }

  try {
    //  verify user has access to project
    await verifyProjectOwnership(projectId, userId);

    let attachment = null;
    if (req.file) {
      // Upload file to S3
      // console.log("goni to get link for file");
      //storing full url.
      const { signedUrl } = await uploadToS3(req.file);
      attachment = signedUrl;
    }

    const comment = await createComment(content, attachment, userId, taskId, parent_id);
    return res.status(201).json({ success: true, message: 'Comment Added', comment });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Comments
const handleGetComments = async (req, res) => {
  const { pId, tId } = req.params;
  const userId = req.user.id;

  try {
    await verifyProjectOwnership(pId, userId);
    const comments = await getCommentsByTask(tId);
    // for (const comment of comments) {
    //   if (comment.attachment) {
    //     console.log("Comments have attachements.");
        
    //     comment.attachment = await getSignedS3Url(comment.attachment);
    //   }
    // }
    return res.status(200).json({ success: true, comments });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Comment
const handleDeleteComment = async (req, res) => {
  const { cId } = req.params;
  const userId = req.user.id;

  try {
    const deleted = await deleteComment(cId, userId);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Comment not found or unauthorized' });
    }
    return res.status(200).json({ success: true,message:'Comment Deleted', comment: deleted });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  handleCreateComment,
  handleGetComments,
  handleDeleteComment
};
