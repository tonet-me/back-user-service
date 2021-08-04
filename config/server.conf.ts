export default () => ({
  port: parseInt(process.env.PORT, 10) || 5051,
  host: process.env.HOST || 'localhost',
  otpTTL: parseInt(process.env.OTP_TTL, 10) || 120,
});
