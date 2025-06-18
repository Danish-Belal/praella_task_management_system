const AWS = require('aws-sdk');
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// function to test connection eltablishment
const testS3Connection = async () => {
  try {
    const buckets = await s3.listBuckets().promise();
    console.log('S3 connection success. Buckets:', buckets.Buckets.map(b => b.Name));
  } catch (err) {
    console.error('S3 connection failed:', err.message);
  }
};

// testS3Connection();   // uncomment this fun when need to test.

module.exports = s3;
