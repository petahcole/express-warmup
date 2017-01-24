require('dotenv').config();

module.exports = {

  development: {
    client: 'pg',
    connection: process.env.DEV_URL
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL + "?ssl=true"
  },

  

};
