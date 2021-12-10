export default () => ({
  database: {
    host: process.env.MONGO_HOST,
    port: parseInt(process.env.MONGO_PORT, 10) || 27017,
    dbName: process.env.MONGO_DB_NAME,
    authMechanism: process.env.AUTH_MECHANISM || undefined,
    authSource: process.env.AUTH_SOURCE || undefined,
    dbUser: process.env.DB_USER || undefined,
    dbPass: process.env.DB_PASS || undefined,
    uri: `mongodb://${process.env.MONGO_HOST}:${process.env.MONGO_PORT}`,
  },
});
