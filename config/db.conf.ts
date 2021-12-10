export default () => ({
  database: {
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT, 10) || 27017,
    dbName: process.env.MONGO_DB_NAME,
    authMechanism: process.env.AUTH_MECHANISM,
    authSource: process.env.AUTH_SOURCE,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    uri: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
  },
});
