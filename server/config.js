module.exports = {
  SECRET_TOKEN_KEY : 'token',
  DB_HOST : 'mongodb://host:port',
  DB_NAME : process.env.NODE_ENV == 'test' ? 'testnode' : 'node',
  BCRYPT_ROUND : 10,
  PASSWORD_MIN_LENGHT : 6,
  JWT_EXPIRE : 864000 //10 days
}
