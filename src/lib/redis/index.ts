import { promisify } from 'util';
import redis from 'redis';
import dotenv from 'dotenv';
import { CallServiceArgs } from '../services';

dotenv.config();

const client = redis.createClient({
  url: process.env.REDIS_URL,
});

export function getRedisKey({ service, term, country, language }: CallServiceArgs): string {
  return [service, term, country, language].join(':');
}

export const get = promisify(client.get).bind(client);
export const set = promisify(client.set).bind(client);
export const setex = promisify(client.setex).bind(client);
export const del = promisify(client.del).bind(client);
export const cacheExpTime = parseInt(process.env.DEFAULT_CACHE_EXPIRE_TIME || '86400000');
