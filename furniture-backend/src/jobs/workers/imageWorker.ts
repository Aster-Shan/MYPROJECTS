import { Worker } from 'bullmq';
import { Redis } from 'ioredis';
import path from 'path';
import sharp from 'sharp';
const connection = new Redis({
  host: process.env.REDIS_HOST,
  port: 6379,
  //password
  maxRetriesPerRequest: null,
});
//create a wroker to process image optimization job
const ImageWroker = new Worker(
  'imageQueue',
  async (job) => {
    const { filePath, fileName } = job.data;
    const optimizedImagePath = path.join(
      __dirname,
      '../../..',
      '/uploads/optimize',
      fileName,
    );
    await sharp(filePath)
      .resize(200, 200)
      .webp({ quality: 50 })
      .toFile(optimizedImagePath);
  },
  { connection },
);
ImageWroker.on('completed', (job) => {
  console.log(`job completed with result ${job.id}`);
});
ImageWroker.on('failed', (job: any, err) => {
  console.log(`job ${job.id}failed with result ${err.message}`);
});
