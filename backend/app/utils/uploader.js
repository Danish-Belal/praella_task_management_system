const { Upload } = require('@aws-sdk/lib-storage');
const s3 = require('../../config/aws');
const path = require('path');

const uploadToS3 = async (file) => {
  const fileName = `${Date.now()}-${file.originalname}`;
  console.log("File name", fileName);
  
 const upload = new Upload({
  client: s3,
  params: {
    Bucket: process.env.S3_BUCKET,
    Key: `uploads/${fileName}`,
    Body: file.buffer,
    ContentType: file.mimetype,
  }
});
    await upload.done();
    return upload;
};
module.exports = uploadToS3;