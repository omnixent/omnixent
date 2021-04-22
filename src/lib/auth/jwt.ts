import jwt from 'jsonwebtoken';

type JWTConfig = {
  key: jwt.Secret;
  type: jwt.Algorithm[];
};

type JWTContent = {
  'omx-enable-query': boolean;
  [key: string]: any;
};

export default function isAuthorized(authHeader: string) {
  const jwtConfig = process.env.OMNIXENT_JWT_SECRET;

  if (!jwtConfig) throw `Unable to retrieve JWT configuration`;

  const { key, type } = JSON.parse(jwtConfig) as JWTConfig;

  if (!key) throw `Invalid JWT configuration. Missing or invalid key.`;
  if (!type) throw `Invalid JWT configuration. Missing or invalid type.`;

  const token = authHeader.replace('Bearer ', '');
  const JWTContent = jwt.verify(token, key, { algorithms: type }) as JWTContent;

  return Boolean(JWTContent?.['omx-enable-query']);
}
