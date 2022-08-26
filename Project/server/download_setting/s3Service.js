const { S3 } = require("aws-sdk");
const crypto = require('crypto');
const ApiError = require("../error/ApiError");

/*
 exports.s3Uploadv2 = async (files) => {
   const s3 = new S3();

   const params = files.map((file) => {
     return {
       Bucket: process.env.AWS_BUCKET_NAME,
       Key: `uploads/${uuid()}-${file.originalname}`,
       Body: file.buffer,
     };
   });

   return await Promise.all(params.map((param) => s3.upload(param).promise()));
 };*/


 exports.s3Uploadv3 = async (file) => {
  const s3 = new S3();
  const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `uploads/${crypto.randomUUID()}-${file.name}`,
      Body: file.data,
    };

    return await s3.upload(params).promise();
};