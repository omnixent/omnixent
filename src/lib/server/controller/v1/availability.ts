import { Request, Response } from 'express';
import { availableServices } from '../../../services';
import { availableLanguages } from '../../../languages';
import { availableCountries } from '../../../countries';

export default async function publicController(req: Request, res: Response) {
  res.status(200).json({
    success: true,
    result: {
      services: availableServices,
      languages: availableLanguages,
      countries: availableCountries,
    },
  });
}
