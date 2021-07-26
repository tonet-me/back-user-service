export default () => ({
  port: parseInt(process.env.PORT, 10) || 5051,
  host: process.env.HOST || 'localhost',
});
