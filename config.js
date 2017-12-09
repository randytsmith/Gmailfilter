module.exports = {
  mongoURL: process.env.MOGO_URL || 'mongodb://localhost:27017/filters',
  port: process.env.PORT || 8000,
};
