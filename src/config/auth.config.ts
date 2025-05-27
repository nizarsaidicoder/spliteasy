// config/auth.config.ts
export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET || 'dev-secret',
    expiresIn: '1y',
  },
});
