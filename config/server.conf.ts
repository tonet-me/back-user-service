export default () => ({
  port: parseInt(process.env.PORT, 10) || 5051,
  host: process.env.HOST || 'localhost',
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'setSecret',
  accessTokenExpireTime: process.env.ACCESS_TOKEN_EXPIRE_TIME || '72h',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'setSecret',
  refreshTokenExpireTime: process.env.REFRESH_TOKEN_EXPIRATION_TIME || '120h',
  env: process.env.ENV || 'development',
});
