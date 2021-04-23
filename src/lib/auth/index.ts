import apiKeyAuth from './apiKey';
import jwtAuth from './jwt';

export default function isAuthorized(authToken: string) {
  return apiKeyAuth(authToken) || jwtAuth(authToken);
}
