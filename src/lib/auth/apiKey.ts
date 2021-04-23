export default function isAuthorized(key: string): boolean {
  const apiKeys = process.env.OMNIXENT_API_KEY;

  if (!apiKeys) return false;

  return Boolean(JSON.parse(apiKeys!)?.includes(key));
}
