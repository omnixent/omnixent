import { promisify } from 'util';
import redis from 'redis';
import dotenv from 'dotenv';
import chalk from 'chalk';
import { CallServiceArgs } from '../services';

dotenv.config();

interface RedisCache {
  cacheExpTime: string | undefined;
}

class Redis {
  private cacheExpTime = '86400000';
  private enableRedis = false;
  private client: redis.RedisClient | undefined;

  constructor({ cacheExpTime }: RedisCache) {
    this.enableRedis = process.env.REDIS_ENABLED === 'true';

    if (this.enableRedis) {
      this.client = redis.createClient({
        url: process.env.REDIS_URL,
      });
      console.log(chalk.green(`Redis is enabled`));
    } else {
      console.log(chalk.red('Redis is disabled'));
    }

    if (cacheExpTime) this.cacheExpTime = cacheExpTime;
  }

  getRedisKey({ service, term, country, language }: CallServiceArgs): string {
    return [service, term, country, language].join(':');
  }

  get(key: string) {
    if (!this.enableRedis) return;
    return promisify(this.client!.get).bind(this.client)(key);
  }

  set(key: string, value: string) {
    if (!this.enableRedis) return;
    return promisify(this.client!.set).bind(this.client)(key, value);
  }

  setex(key: string, seconds: number = parseInt(this.cacheExpTime), value: string) {
    if (!this.enableRedis) return;
    return promisify(this.client!.setex).bind(this.client)(key, seconds, value);
  }
}

export default new Redis({ cacheExpTime: process.env.DEFAULT_CACHE_EXPIRE_TIME });
