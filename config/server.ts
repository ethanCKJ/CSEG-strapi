module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS'),
  },
  url: env('PUBLIC_URL', 'http://localhost:1337'),
  proxy: true, // Important for Cloudflare
  allowedHosts: [
    '*.trycloudflare.com',
    'localhost',
    '127.0.0.1',
  ],
});