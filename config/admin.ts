
export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
    // Resolves expiresIn deprecation warning. See https://docs.strapi.io/cms/configurations/admin-panel#basic-authentication
    sessions: {
      accessTokenLifespan: 1800, // 30 minutes
      maxRefreshTokenLifespan: 2592000, // 30 days
      idleRefreshTokenLifespan: 604800, // 7 days
      maxSessionLifespan: 2592000, // 30 days
      idleSessionLifespan: 36000, // 1 hour
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
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
});
