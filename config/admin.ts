
export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    // Resolves expiresIn deprecation warning. See https://docs.strapi.io/cms/configurations/admin-panel#basic-authentication
    sessions: {
      accessTokenLifespan: 3600, // 1 hour
      maxRefreshTokenLifespan: 2592000, // 30 days
      idleRefreshTokenLifespan: 604800, // 7 days
      maxSessionLifespan: 2592000, // 30 days
      idleSessionLifespan: 3600, // 1 hour
    }
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: false,
    promoteEE: false,
  },
});
