import { Request, Response } from 'express';
import callService, { CallServiceArgs, Service, availableServices } from '../../../services';
import { Language } from '../../../languages';
import { Country, availableCountries } from '../../../countries';
import * as redis from '../../../redis';

async function getCachedResult(params: CallServiceArgs) {
  const key = redis.getRedisKey(params);
  return redis.get(key);
}

export default async function privateController(req: Request, res: Response) {
  const { term, service, language = 'en', country = 'us', fresh = false } = req.query;

  if (!term || !service) {
    res.status(401).json({
      success: false,
      reason: 'Missing required parameter(s): term/service',
    });
    return;
  }

  if (!availableServices.includes(service as Service)) {
    res.status(401).json({
      success: false,
      reason: `Service ${service} is not available`,
    });
    return;
  }

  if (!availableCountries.includes(country as Country)) {
    res.status(401).json({
      success: false,
      reason: `Country ${country} is not available`,
    });
    return;
  }

  const params: CallServiceArgs = {
    term: String(term),
    service: service as Service,
    language: language as Language,
    country: country as Country,
  };

  if (!fresh) {
    const cachedResult = await getCachedResult(params);

    if (cachedResult) {
      res.status(200).json({
        success: true,
        result: JSON.parse(cachedResult),
      });
      return;
    }
  }

  const result = await callService(params);

  await redis.setex(redis.getRedisKey(params), redis.cacheExpTime, JSON.stringify(result));

  res.status(200).json({
    success: true,
    result: result,
  });
}