export default () => ({
  port: parseInt(process.env.PORT, 10) || 5051,
  host: process.env.HOST || 'localhost',
  otpTTL: parseInt(process.env.OTP_TTL, 10) || 120,
  secret: process.env.SECRET || 'setSecret',
  tokenExpireTime: process.env.TOKEN_EXPIRE_TIME || '2m',
});
