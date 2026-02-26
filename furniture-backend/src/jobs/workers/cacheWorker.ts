import { Worker } from 'bullmq';
import { redis } from '../../../config/redisClient';

const cacheWorker = new Worker('cache-invalidation', async (job) => {}, {
  connection: redis,
  concurrency: 5,
});

cacheWorker.on('completed', (job) => {
  console.log(`job completed with result ${job.id}`);
});

cacheWorker.on('failed', (job: any, err) => {
  console.log(`job ${job.id}failed with result ${err.message}`);
});
