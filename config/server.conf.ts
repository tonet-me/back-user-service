export default () => ({
  port: parseInt(process.env.PORT, 10) || 5051,
  host: process.env.HOST || 'localhost',
  otpTTL: parseInt(process.env.OTP_TTL, 10) || 120,
  accessTokenSecret: process.env.ACCESS_TOKEN_SECRET || 'setSecret',
  accessTokenExpireTime: process.env.ACCESS_TOKEN_EXPIRE_TIME || '2m',
  refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET || 'setSecret',
  refreshTokenExpireTime: process.env.REFRESH_TOKEN_EXPIRATION_TIME || '5m',
});
