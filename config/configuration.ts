export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT, 10) || 27017,
    // user: process.env.DATABASE_USER,
    // pass: process.env.DATABASE_PASS,
    uri: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}/social-profile-test-v1`,
  },
  jwtSecret: process.env.JWT_SECRET || 'secret',
});
