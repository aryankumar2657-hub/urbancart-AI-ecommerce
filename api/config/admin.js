module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'urbanCartAdminSecret123'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', 'urbanCartApiTokenSalt123'),
  },
});
