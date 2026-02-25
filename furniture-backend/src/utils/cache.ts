import { redis } from '../../config/redisClient';

export const getOrSetCache = async (key: any, cb: any) => {
  // cb-call back function
  try {
    const catchedData = await redis.get(key);
    if (catchedData) {
      console.log('Chache hit');
      return JSON.parse(catchedData);
    }

    console.log('Cache miss');
    const freshData = await cb();
    await redis.setex(key, 3600, JSON.stringify(freshData)); //cache expiration = 1hr
    return freshData;
  } catch (error) {
    console.error('Redis error', error);
    throw error;
  }
};
