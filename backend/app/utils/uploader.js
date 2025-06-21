const { Upload } = require('@aws-sdk/lib-storage');
const s3 = require('../../config/aws');
const path = require('path');
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { GetObjectCommand } = require("@aws-sdk/client-s3");

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

const getSignedS3Url = async (key) => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 }); // 1 hour
  // console.log("Signed URL",signedUrl);
  
  return signedUrl;
};

module.exports = {uploadToS3, getSignedS3Url};