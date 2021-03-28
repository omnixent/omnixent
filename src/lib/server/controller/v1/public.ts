import { Request, Response } from 'express';
import callService from '../../../services';
import * as redis from '../../../redis';

const missingTermError = {
  success: false,
  reason: 'Missing required "term" query parameter',
};

function getKey(term: string): string {
  return redis.getRedisKey({
    term,
    service: 'google',
    language: 'en',
    country: 'us',
  });
}

async function getCachedResult(term: string) {
  const key = getKey(term);
  return redis.get(key);
}

export default async function publicController(req: Request, res: Response) {
  const term = req?.query?.term;
  if (!term) return res.status(401).json(missingTermError);

  const t = String(term);
  const cachedResult = await getCachedResult(t);

  if (cachedResult) {
    res.status(200).json({
      success: true,
      result: JSON.parse(cachedResult),
    });
    return;
  }

  const result = await callService({
    term: t,
    service: 'google',
    language: 'en',
    country: 'us',
  });

  await redis.setex(getKey(t), redis.cacheExpTime, JSON.stringify(result));

  res.status(200).json({
    success: true,
    result: result,
  });
}
