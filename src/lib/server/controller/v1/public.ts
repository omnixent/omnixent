import { Request, Response } from 'express';
import callService from '../../../services';
import Redis from '../../../redis';

const missingTermError = {
  success: false,
  reason: 'Missing required "term" query parameter',
};

function getKey(term: string): string {
  return Redis.getRedisKey({
    term,
    service: 'google',
    language: 'en',
    country: 'us',
  });
}

async function getCachedResult(term: string) {
  const key = getKey(term);
  return Redis.get(key);
}

export default async function publicController(req: Request, res: Response) {
  const term = req?.query?.term;
  if (!term) return res.status(401).json(missingTermError);

  const t = String(term);
  const cachedResult = await getCachedResult(t);

  if (cachedResult) {
    res.status(200).json({
      success: true,
      cached: true,
      result: JSON.parse(cachedResult),
    });
    return;
  }

  const result = await callService({
    term: t,
    language: 'en',
    country: 'us',
    service: 'google',
  });

  await Redis.setex(getKey(t), undefined, JSON.stringify(result));

  res.status(200).json({
    success: true,
    cached: false,
    result: result,
  });
}
