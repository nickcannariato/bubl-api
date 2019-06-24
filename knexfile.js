// Update with your config settings.
require('dotenv').config()

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    },
    migrations: {
      directory: './models/migrations'
    },
    seeds: {
      directory: './models/seeds'
    }
  },
  production: {
    client: 'postgresql',
    connection: {
      database: process.env.PROD_DB,
      user: process.env.PROD_USER,
      password: process.env.PROD_PW,
    }
  }
};
