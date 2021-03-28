import { Request, Response } from 'express';
import callService from '../../../services';

const missingTermError = {
  success: false,
  reason: 'Missing required "term" query parameter',
};

export default async function publicController(req: Request, res: Response) {
  const term = req?.query?.term;
  if (!term) return res.status(401).json(missingTermError);

  const result = await callService({
    term: String(term),
    service: 'google',
    language: 'en',
    country: 'us',
  });

  res.status(200).json({
    success: true,
    result: result,
  });
}
