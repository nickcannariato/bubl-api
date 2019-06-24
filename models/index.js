const knex = require('knex');
const knexConfig = require('../knexfile.js');

require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';
console.log(`Deploying ${environment} build.`);

module.exports = knex(knexConfig[environment]);