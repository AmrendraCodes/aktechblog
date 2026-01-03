export default ({ env }) => ({
  host: '0.0.0.0',
  port: env.int('PORT', 1337),
  url: env('PUBLIC_URL'),
  app: { keys: env.array('APP_KEYS', ['key1','key2','key3','key4']) },
});
