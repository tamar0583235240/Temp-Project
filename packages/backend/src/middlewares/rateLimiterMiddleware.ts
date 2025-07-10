 import { RateLimiterRedis } from 'rate-limiter-flexible';
import Redis from 'ioredis';
 import { Request, Response, NextFunction } from 'express';
console.log("zxcvgbhjmk");

const redisClient = new Redis(process.env.REDIS_URL!);
console.log("rasdcghhb");

const rateLimiter = new RateLimiterRedis({
  storeClient: redisClient,
  keyPrefix: 'rl',
  points: 100,         // כמה בקשות מותר
  duration: 60 * 10,   // ב-10 דקות
});




 export default async function rateLimiterMiddleware(req:Request, res:Response, next:NextFunction) 
  {
    redisClient.ping()
  .then(() => console.log("✅ Redis connected"))
  .catch(err => {
    console.error("❌ Redis connection failed", err);
  });
  try {
    await rateLimiter.consume(req.ip || '');
;console.log("tttt");

    next();
  } catch (rejRes:any) {
    res.set('Retry-After', String(Math.round(rejRes.msBeforeNext / 1000)));
    res.status(429).json({
      message: `יותר מדי בקשות. נסי שוב עוד ${Math.round(rejRes.msBeforeNext / 1000)} שניות`,
    });
  }
}

// {
//     console.log("-ג---");

// const redis = new Redis(process.env.REDIS_URL|| "redis://localhost:6379");
// console.log("----");

// redis.ping().then(console.log).catch(console.error);
// }