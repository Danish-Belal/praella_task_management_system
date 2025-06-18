const { S3Client,ListBucketsCommand  } = require('@aws-sdk/client-s3');

require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

// function to test connection eltablishment
const testS3Connection = async () => {
  try {
    const command = new ListBucketsCommand({});
    const response = await s3.send(command);
    console.log('S3 connection success. Buckets:', response.Buckets.map(b => b.Name));
  } catch (err) {
    console.error('S3 connection failed:', err.message);
  }
};

// testS3Connection();   // uncomment this fun when need to test.

module.exports = s3;
