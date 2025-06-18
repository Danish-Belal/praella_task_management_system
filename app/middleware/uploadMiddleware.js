const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const s3 = require('../../config/aws'); 
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

 const upload = multer({
  storage: multer.memoryStorage(), // ✅ required for file.buffer
  limits: { fileSize: 5 * 1024 * 1024 }, // optional 5MB limit
});

module.exports = upload;
